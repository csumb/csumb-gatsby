const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const directoryTemplate = path.resolve(`src/templates/directory/person.js`)
    const jsonTemplate = path.resolve(`src/templates/json.js`)
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
          return
        }
        let files = {}
        result.data.allCsumbDirectory.edges.forEach(async edge => {
          const emailPrefix = edge.node.user.email.split('@').shift()
          createPage({
            path: `directory/person/${emailPrefix}`,
            component: directoryTemplate,
            context: {
              user: edge.node.user,
            },
          })
          createPage({
            path: `directory/person/json/${emailPrefix}`,
            component: jsonTemplate,
            isJson: true,
            context: {
              content: edge.node.user,
            },
          })
        })
        report.success(`built individual directory pages`)
        return
      })
    )
  })
}
