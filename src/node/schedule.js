const path = require(`path`)
const fs = require(`fs-extra`)

module.exports = (graphql, actions) => {
  const { createPage } = actions
  const scheduleFrontpageTemplate = path.resolve(`src/templates/schedule/frontpage.js`)
  const scheduleCourseTemplate = path.resolve(`src/templates/schedule/course.js`)
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
        result.data.allSubjectsCsv.edges.forEach(edge => {
          allSubjects[edge.node.code] = edge.node
        });
        result.data.allTermCsv.edges.forEach(async edge => {
          let termSubjects = {}
          const term = edge.node.TERM
          result.data.allScheduleCsv.edges.forEach(edge => {
            if(edge.node.STRM == term) {
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
        })

        return
      })
    )
  })
}