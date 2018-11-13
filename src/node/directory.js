const path = require(`path`)
require(`gatsby-source-filesystem`)

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const directoryTemplate = path.resolve(`src/templates/directory/person.js`)
    // Query for CSV content from catalog
    resolve(
      graphql(
        `
          {
            allCsumbDirectory(
              filter: {
                user: {
                  directoryJobClass: { ne: "1800" }
                  directoryJobClass: { ne: "4660" }
                  directoryJobClass: { ne: "2403" }
                  directoryJobClass: { ne: "1870" }
                  directoryJobClass: { ne: "1871" }
                  directoryJobClass: { ne: "1868" }
                  directoryJobClass: { ne: "1872" }
                  directoryJobClass: { ne: "1874" }
                  directoryJobClass: { ne: "1875" }
                  directoryJobClass: { ne: "1876" }
                }
              }
            ) {
              edges {
                node {
                  user {
                    firstName
                    lastName
                    directoryBuilding
                    directoryBuildingCode
                    directoryJobClass
                    directoryTitle
                    directoryDepartment
                    directoryPhone
                    email
                    directoryPhoto
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        result.data.allCsumbDirectory.edges.forEach(async edge => {
          const emailPrefix = edge.node.user.email.split('@').shift()
          createPage({
            path: `directory/person/${emailPrefix}`,
            component: directoryTemplate,
            context: {
              user: edge.node.user,
            },
          })
        })

        return
      })
    )
  })
}
