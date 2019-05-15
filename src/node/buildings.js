const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const courseTemplate = path.resolve(`src/templates/directory/building.js`)
    resolve(
      graphql(
        `
          {
            allCsumbBuilding {
              edges {
                node {
                  buildingName
                  code
                  address {
                    street
                    city
                    state
                    zip
                  }
                  mailingAddress {
                    display
                    street
                    building
                    city
                    state
                    zip
                  }
                  center {
                    lat
                    lng
                  }
                  outline {
                    type
                    coordinates
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
          return
        }
        result.data.allCsumbBuilding.edges.forEach(edge => {
          if (!edge.node.code) {
            return
          }
          createPage({
            path: `directory/building/${edge.node.code.toLowerCase().trim()}`,
            component: courseTemplate,
            context: {
              building: edge.node,
            },
          })
        })
        report.success(`built building pages.`)

        return
      })
    )
  })
}
