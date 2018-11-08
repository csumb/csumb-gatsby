const path = require(`path`)
const fs = require(`fs-extra`)

module.exports = (graphql, actions) => {
  const { createPage } = actions
  const scheduleFrontpageTemplate = path.resolve(
    `src/templates/schedule/frontpage.js`
  )
  const scheduleCourseTemplate = path.resolve(
    `src/templates/schedule/course.js`
  )
  const scheduleCourseListSubjectTemplate = path.resolve(
    `src/templates/schedule/course-list-subject.js`
  )
  const scheduleCourseListGETemplate = path.resolve(
    `src/templates/schedule/course-list-ge.js`
  )

  const processAttributes = attributes => {
    let result = {}
    if (!attributes.length) {
      return result
    }
    attributes = attributes.split(',')
    attributes.forEach(attribute => {
      attribute = attribute.trim().split('=')
      if (typeof result[attribute[0]] === 'undefined') {
        result[attribute[0]] = []
      }
      result[attribute[0]].push(attribute[1])
    })
    return result
  }
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allSubjectsCsv {
              edges {
                node {
                  code
                  name
                }
              }
            }
            allGeCsv {
              edges {
                node {
                  code
                  name
                }
              }
            }
            allScheduleCsv {
              edges {
                node {
                  SUBJECT
                  STRM
                  CRSE_ID
                  CATALOG_NBR
                  SECTION
                  TITLE
                  CRN
                  UNITS
                  DESCR
                  ATTRIBUTES
                }
              }
            }
            allTermCsv(filter: { SESSION_CODE: { eq: "1" } }) {
              edges {
                node {
                  TERM
                  DESCR
                  SESSION_CODE
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        let allSubjects = {}
        let allTerms = {}
        result.data.allSubjectsCsv.edges.forEach(edge => {
          allSubjects[edge.node.code] = edge.node
        })

        result.data.allTermCsv.edges.forEach(async edge => {
          allTerms[edge.node.TERM] = edge.node
          let termSubjects = {}
          let allTermCourses = {
            subject: {},
            ge: {},
          }
          const term = edge.node
          result.data.allScheduleCsv.edges.forEach(edge => {
            let attributes = processAttributes(edge.node.ATTRIBUTES)
            if (edge.node.STRM == term.TERM) {
              termSubjects[edge.node.SUBJECT] = allSubjects[edge.node.SUBJECT]
              if (
                typeof allTermCourses.subject[edge.node.SUBJECT] === 'undefined'
              ) {
                allTermCourses.subject[edge.node.SUBJECT] = []
              }
              allTermCourses.subject[edge.node.SUBJECT].push(edge.node)
              if (typeof attributes.GE !== 'undefined') {
                attributes.GE.forEach(ge => {
                  if (typeof allTermCourses.ge[ge] === 'undefined') {
                    allTermCourses.ge[ge] = []
                  }
                  allTermCourses.ge[ge].push(edge.node)
                })
              }
            }
          })

          termSubjects = Object.values(termSubjects)
          termSubjects.sort((a, b) => {
            if (a.code < b.code) {
              return -1
            }
            if (a.code > b.code) {
              return 1
            }
            return 0
          })

          createPage({
            path: `schedule/${edge.node.DESCR.toLowerCase().replace(' ', '')}`,
            component: scheduleFrontpageTemplate,
            context: {
              term: edge.node,
              ge: result.data.allGeCsv.edges,
              termSubjects: termSubjects,
            },
          })

          termSubjects.forEach(subject => {
            createPage({
              path: `schedule/${edge.node.DESCR.toLowerCase().replace(
                ' ',
                ''
              )}/${subject.code.toLowerCase()}`,
              component: scheduleCourseListSubjectTemplate,
              context: {
                term: edge.node,
                subject: subject,
                courses: allTermCourses.subject[subject.code],
              },
            })
          })

          result.data.allGeCsv.edges.forEach(ge => {
            createPage({
              path: `schedule/${edge.node.DESCR.toLowerCase().replace(
                ' ',
                ''
              )}/ge/${ge.node.code.toLowerCase()}`,
              component: scheduleCourseListGETemplate,
              context: {
                term: edge.node,
                ge: ge.node,
                courses:
                  typeof allTermCourses.ge[ge.node.code] !== 'undefined'
                    ? allTermCourses.ge[ge.node.code]
                    : [],
              },
            })
          })
        })

        result.data.allScheduleCsv.edges.forEach(async edge => {
          const term = allTerms[edge.node.STRM]
          createPage({
            path: `schedule/${term.DESCR.toLowerCase().replace(
              ' ',
              ''
            )}/course/${edge.node.CRN}`,
            component: scheduleCourseTemplate,
            context: {
              term: term,
              course: edge.node,
            },
          })
        })

        return
      })
    )
  })
}
