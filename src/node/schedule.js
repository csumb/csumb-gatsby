const path = require(`path`)
const fs = require(`fs-extra`)

module.exports = (graphql, actions) => {
  const { createPage } = actions
  const scheduleFrontpageTemplate = path.resolve(`src/templates/schedule/frontpage.js`)
  const scheduleCourseTemplate = path.resolve(`src/templates/schedule/course.js`)
  const scheduleCourseListTemplate = path.resolve(`src/templates/schedule/course-list.js`)
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
              }
            }
          }
          allTermCsv(filter: {SESSION_CODE: {eq: "1"}}) {
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
        });

        result.data.allTermCsv.edges.forEach(async edge => {
          allTerms[edge.node.TERM] = edge.node
          let termSubjects = {}
          let allTermCourses = []
          const term = edge.node
          result.data.allScheduleCsv.edges.forEach(edge => {
            if(edge.node.STRM == term.TERM) {
              termSubjects[edge.node.SUBJECT] = allSubjects[edge.node.SUBJECT]
            }
          })
          termSubjects = Object.values(termSubjects)
          createPage({
            path: `schedule/${edge.node.DESCR.toLowerCase().replace(' ', '')}`,
            component: scheduleFrontpageTemplate,
            context: {
              term: edge.node,
              ge: result.data.allGeCsv.edges,
              termSubjects: termSubjects
            }
          })
          termSubjects.forEach(subject => {

            createPage({
              path: `schedule/${edge.node.DESCR.toLowerCase().replace(' ', '')}/${subject.code.toLowerCase()}`,
              component: scheduleCourseListTemplate,
              context: {
                term: edge.node,
                subject: subject
              }
            })
          })
        })

        result.data.allScheduleCsv.edges.forEach(async edge => {
          const term = allTerms[edge.node.STRM]
          createPage({
            path: `schedule/${term.DESCR.toLowerCase().replace(' ', '')}/${edge.node.CRN}`,
            component: scheduleCourseTemplate,
            context: {
              term: term,
              course: edge.node
            }
          })
        })

        return
      })
    )
  })
}