const path = require(`path`)
const fs = require(`fs-extra`)

module.exports = graphql => {
  return new Promise((resolve, reject) => {
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
        result.data.allCatalogCsv.edges.forEach(async edge => {
          createPage({
            path: `course/${edge.node.SUBJECT.toLowerCase()}/${edge.node.CATALOG_NBR.toLowerCase().trim()}`,
            component: courseTemplate,
            context: {
              course: edge.node,
            },
          })
        })

        return
      })
    )
  })
}
