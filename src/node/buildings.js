const path = require(`path`)
const fs = require(`fs-extra`)
require(`gatsby-source-filesystem`)

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const courseTemplate = path.resolve(`src/templates/building.js`)
    resolve(
      graphql(
        `
          {
            allCsumbBuilding {
              edges {
                node {
                  buildingName
                  code
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        result.data.allCsumbBuilding.edges.forEach(async edge => {
          createPage({
            path: `building/${edge.node.code.toLowerCase().trim()}`,
            component: courseTemplate,
            context: {
              building: edge.node,
            },
          })
        })

        return
      })
    )
  })
}
