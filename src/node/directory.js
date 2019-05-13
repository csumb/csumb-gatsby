const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const directoryTemplate = path.resolve(`src/templates/directory/person.js`)
    resolve(
      graphql(
        `
          {
            allCsumbDirectory(
              filter: {
                user: {
                  directoryJobCode: {
                    nin: [
                      "1800"
                      "4660"
                      "2403"
                      "1870"
                      "1871"
                      "1868"
                      "1872"
                      "1874"
                      "1875"
                      "1876"
                    ]
                  }
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
                    _publicProfile {
                      phone
                      biography
                      photo
                      buildingCode
                      location
                      appointmentCalendar
                      officeHours
                    }
                    fullDepartments {
                      name
                      website
                    }
                  }
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
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
          console.log('Could not query directory')
          return
        }
        const buildings = {}
        result.data.allCsumbBuilding.edges.forEach(building => {
          buildings[building.node.code] = building.node.buildingName
        })

        result.data.allCsumbDirectory.edges.forEach(async edge => {
          const emailPrefix = edge.node.user.email.split('@').shift()
          const building =
            edge.node.user._publicProfile &&
            edge.node.user._publicProfile.buildingCode &&
            typeof buildings[edge.node.user._publicProfile.buildingCode] !==
              'undefined'
              ? buildings[edge.node.user._publicProfile.buildingCode]
              : ''

          createPage({
            path: `directory/person/${emailPrefix}`,
            component: directoryTemplate,
            context: {
              user: edge.node.user,
              building: building,
            },
          })
        })
        report.success(`built individual directory pages`)
        return
      })
    )
  })
}
