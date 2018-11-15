const path = require(`path`)
const fs = require(`fs-extra`)

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const jsonTemplate = path.resolve(`src/templates/json.js`)
    resolve(
      graphql(
        `
          {
            allScheduleCsv {
              edges {
                node {
                  SUBJECT
                  STRM
                  CATALOG_NBR
                  CRN
                  SECTION
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        let courses = {}
        result.data.allScheduleCsv.edges.forEach(async edge => {
          if (typeof courses[edge.node.STRM] === 'undefined') {
            courses[edge.node.STRM] = []
          }
          courses[edge.node.STRM].push(
            `${edge.node.SUBJECT} ${edge.node.CATALOG_NBR}`
          )
        })
        for (let term in courses) {
          if (courses.hasOwnProperty(term)) {
            createPage({
              path: `schedule/search/${term}.json`,
              component: jsonTemplate,
              context: {
                json: JSON.stringify(courses[term]),
              },
            })
          }
        }

        return
      })
    )
  })
}
