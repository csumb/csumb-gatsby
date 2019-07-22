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
            allCsumbDirectory {
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
                      resume
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
            edge.node.user._publicProfile.location &&
            typeof buildings[
              edge.node.user_publicProfile.location.split('-').shift()
            ] !== 'undefined'
              ? buildings[
                  edge.node.user_publicProfile.location.split('-').shift()
                ]
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
