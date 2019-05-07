const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)

const cleanDate = date => date.replace('00:00:00.0', '').trim()

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
            allCsumbDirectory {
              edges {
                node {
                  user {
                    firstName
                    lastName
                    login
                    email
                  }
                }
              }
            }
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
                  type
                  url
                }
              }
            }
            allScheduleCsv(
              filter: { CLASS_STAT: { ne: "X" } }
              sort: { fields: [SUBJECT, CATALOG_NBR, SECTION] }
            ) {
              edges {
                node {
                  SUBJECT
                  STRM
                  CRSE_ID
                  CATALOG_NBR
                  SECTION
                  TITLE
                  CRSE_TOPIC_TITLE
                  CRN
                  INSTR_OTTERID
                  UNITS
                  FEES
                  NOTES
                  CONSENT
                  DESCR
                  ATTRIBUTES
                  ENRL_TOT
                  ENRL_MAX
                }
              }
            }
            allMeetingPatCsv(
              sort: { fields: [MEETING_DATE_START, MEETING_TIME_START] }
            ) {
              edges {
                node {
                  CRN
                  STRM
                  SESSION_CODE
                  SECTION
                  MON
                  TUES
                  WED
                  THURS
                  FRI
                  SAT
                  SUN
                  MEETING_TIME_START
                  MEETING_TIME_END
                  MEETING_DATE_START
                  MEETING_DATE_END
                  MEETING_BLDG
                  MEETING_RM
                }
              }
            }
            allCsumbBuilding {
              edges {
                node {
                  buildingName
                  code
                }
              }
            }
            allTermCsv(
              filter: { SESSION_CODE: { eq: "1" } }
              sort: { fields: [TERM] }
            ) {
              edges {
                node {
                  TERM
                  DESCR
                  SESSION_CODE
                  TERM_BEGIN_DT
                  TERM_END_DT
                }
              }
            }
            site {
              siteMetadata {
                schedule {
                  currentTerm
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
        let allMeetingPatterns = {}
        let allBuildings = {}
        let allDirectory = {}
        let termDates = {}

        result.data.allTermCsv.edges.forEach(({ node }) => {
          if (typeof termDates[node.TERM] === 'undefined') {
            termDates[node.TERM] = {
              start: cleanDate(node.TERM_BEGIN_DT),
              end: cleanDate(node.TERM_END_DT),
            }
          }
        })

        result.data.allCsumbDirectory.edges.forEach(person => {
          const login = person.node.user.login.split('@').shift()
          allDirectory[login] = person.node.user
        })

        result.data.allCsumbBuilding.edges.forEach(edge => {
          allBuildings[edge.node.code] = edge.node
        })

        result.data.allMeetingPatCsv.edges.forEach(edge => {
          if (typeof allMeetingPatterns[edge.node.STRM] === 'undefined') {
            allMeetingPatterns[edge.node.STRM] = {}
          }
          if (
            typeof allMeetingPatterns[edge.node.STRM][edge.node.CRN] ===
            'undefined'
          ) {
            allMeetingPatterns[edge.node.STRM][edge.node.CRN] = []
          }
          //Have to strip out leading zeros in the meeting pattern.
          const buildingNumber = edge.node.MEETING_BLDG.replace(/^0*/, '')
          if (typeof allBuildings[buildingNumber] !== 'undefined') {
            edge.node._building = allBuildings[buildingNumber]
          }
          if (edge.node.MEETING_TIME_START) {
            if (
              cleanDate(edge.node.MEETING_DATE_START) !==
                termDates[edge.node.STRM].start ||
              cleanDate(edge.node.MEETING_DATE_END) !==
                termDates[edge.node.STRM].end
            ) {
              edge.node._separateDates = {
                start: cleanDate(edge.node.MEETING_DATE_START),
                end: cleanDate(edge.node.MEETING_DATE_END),
              }
            }
            allMeetingPatterns[edge.node.STRM][edge.node.CRN].push(edge.node)
          }
        })

        let allCourses = result.data.allScheduleCsv.edges.map(edge => {
          let instructors = edge.node.INSTR_OTTERID
          edge.node._instructors = []
          if (instructors) {
            instructors.split(',').forEach(instructor => {
              if (typeof allDirectory[instructor.trim()] !== 'undefined') {
                edge.node._instructors.push(allDirectory[instructor.trim()])
              }
            })
          }
          edge.node._meetingPattern = false
          if (
            typeof allMeetingPatterns[edge.node.STRM][edge.node.CRN] !==
            'undefined'
          ) {
            edge.node._meetingPattern =
              allMeetingPatterns[edge.node.STRM][edge.node.CRN]
          }
          return edge
        })

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
          allCourses.forEach(edge => {
            let attributes = processAttributes(edge.node.ATTRIBUTES)
            edge.node._attributes = attributes
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
              if (typeof attributes.UR !== 'undefined') {
                attributes.UR.forEach(ge => {
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
              allGe: result.data.allGeCsv.edges,
              termSubjects: termSubjects,
              allTerms: allTerms,
            },
          })
          if (
            parseInt(edge.node.TERM) ===
            parseInt(result.data.site.siteMetadata.schedule.currentTerm)
          ) {
            createPage({
              path: `schedule`,
              component: scheduleFrontpageTemplate,
              context: {
                term: edge.node,
                allGe: result.data.allGeCsv.edges,
                termSubjects: termSubjects,
                allTerms: allTerms,
              },
            })
            createPage({
              path: `planning/schedule`,
              component: scheduleFrontpageTemplate,
              context: {
                term: edge.node,
                allGe: result.data.allGeCsv.edges,
                termSubjects: termSubjects,
                allTerms: allTerms,
              },
            })
          }

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

        allCourses.forEach(async edge => {
          const term = allTerms[edge.node.STRM]
          createPage({
            path: `schedule/${term.DESCR.toLowerCase().replace(
              ' ',
              ''
            )}/course/${edge.node.CRN}`,
            component: scheduleCourseTemplate,
            context: {
              term: term,
              requirements: result.data.allGeCsv.edges,
              course: edge.node,
            },
          })
        })
        report.success(`built course schedule pages`)

        return
      })
    )
  })
}
