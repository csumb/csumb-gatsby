const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve()
    const pageTemplate = path.resolve(`src/templates/page.js`)
    let sites = {}

    resolve(
      graphql(
        `
          {
            allCsumbContentSite {
              edges {
                node {
                  site
                  title
                }
              }
            }

            allCsumbContentNavigation {
              edges {
                node {
                  site
                  navigation
                }
              }
            }

            allFile(
              filter: {
                sourceInstanceName: { eq: "web-content" }
                extension: { eq: "json" }
              }
            ) {
              edges {
                node {
                  relativePath
                  absolutePath
                  childCsumbContentPage {
                    title
                    site
                    pageContent
                    breadcrumbs
                    layout
                    event {
                      dates {
                        start
                        end
                      }
                      times {
                        start
                        end
                      }
                      description
                      ticket {
                        url
                        title
                      }
                      cost_message
                      location {
                        type
                      }
                    }
                  }
                }
              }
            }
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
        if (!result.data) {
          return
        }
        let count = 0

        let directory = {}
        result.data.allCsumbDirectory.edges.forEach(edge => {
          directory[edge.node.user.email] = edge.node.user
        })

        result.data.allCsumbContentSite.edges.forEach(edge => {
          if (typeof sites[edge.node.site] === 'undefined') {
            sites[edge.node.site] = {
              site: edge.node,
              navigation: null,
            }
          }
        })

        result.data.allCsumbContentNavigation.edges.forEach(edge => {
          if (typeof sites[edge.node.site] !== 'undefined') {
            sites[edge.node.site].navigation = edge.node.navigation
          }
        })

        result.data.allFile.edges.forEach(edge => {
          if (edge.node.relativePath.search('_data') > -1) {
            return
          }
          const content = edge.node.childCsumbContentPage
          let path = edge.node.relativePath
          path = path.replace('index.json', '').replace('.json', '')
          if (typeof sites[content.site] !== 'undefined') {
            count++
            let pageNode = {
              path: path,
              component: pageTemplate,
              layout: 'index',
              context: {
                filePath: edge.node.relativePath,
                title: content.title,
                site: sites[content.site].site,
                breadcrumbs: content.breadcrumbs,
                layout: content.layout,
                navigation: sites[content.site].navigation,
                people: directory,
                pageContent: content.pageContent,
              },
            }
            if (typeof content.event !== 'undefined') {
              pageNode.context.event = content.event
            }
            createPage(pageNode)
          }
        })
        report.success(`built ${count} web pages`)
        resolve()
      })
    )
  })
}
