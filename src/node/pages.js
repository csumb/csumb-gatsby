const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`src/templates/page.js`)
    let sites = {}

    resolve(
      graphql(
        `
          {
            site {
              siteMetadata {
                overridePages
              }
            }

            allCsumbSite {
              edges {
                node {
                  site
                  title
                  staffPage
                  social {
                    url
                    site
                  }
                  contact {
                    phone
                    email
                    floor
                    suite
                    fax
                    building {
                      name
                      code
                    }
                  }
                }
              }
            }

            allCsumbNavigation {
              edges {
                node {
                  site
                  navigation
                }
              }
            }

            allCsumbPage {
              edges {
                node {
                  pagePath
                  title
                  site
                  pageContent
                  drupalNid
                  embedTargetSite
                  topHero {
                    headline
                    text
                    buttonUrl
                    buttonText
                    position
                    image {
                      url
                    }
                  }
                  navigation {
                    url
                    name
                  }
                  breadcrumbs
                  feedbackEmail
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
                    image
                    description
                    ticket {
                      url
                      title
                    }
                    cost_message
                    location {
                      type
                      description
                      room
                      url
                      building {
                        name
                        code
                      }
                      address {
                        organisation
                        street
                        premise
                        city
                        state
                        zip
                      }
                    }
                  }
                }
              }
            }
            allAirtable(
              filter: { queryName: { in: ["UniversityPersonnelPages"] } }
              sort: { fields: [data___Name] }
            ) {
              edges {
                node {
                  id
                  table
                  recordId
                  data {
                    Name
                    Content
                    Page_ID
                    Link
                    Parent {
                      id
                      data {
                        Page_ID
                        Name
                        Notes
                        Link
                      }
                    }
                    Documents {
                      id
                      data {
                        Name
                        Notes
                        Attachments {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (!result.data) {
          report.error(`Could not query content pages.`)
          return
        }
        const overridePages = result.data.site.siteMetadata.overridePages
        let count = 0

        const upForms = {}
        const upPages = {}

        result.data.allAirtable.edges.forEach(edge => {
          const data = edge.node.data
          if (data.Page_ID) {
            upForms[data.Page_ID] = data
            if (data.Parent) {
              data.Parent.forEach(parent => {
                if (typeof upPages[parent.data.Page_ID] === 'undefined') {
                  upPages[parent.data.Page_ID] = []
                }
                upPages[parent.data.Page_ID].push(edge)
              })
            }
          }
        })

        result.data.allCsumbSite.edges.forEach(({ node }) => {
          if (typeof sites[node.site] === 'undefined') {
            sites[node.site] = {
              site: node,
              navigation: null,
            }
          }
        })

        result.data.allCsumbNavigation.edges.forEach(({ node }) => {
          if (typeof sites[node.site] !== 'undefined') {
            sites[node.site].navigation = node.navigation
          }
        })

        result.data.allCsumbPage.edges.forEach(({ node }) => {
          if (
            typeof sites[node.site] !== 'undefined' &&
            overridePages.indexOf(node.pagePath) === -1
          ) {
            count++
            let pageNode = {
              path: node.pagePath,
              component: pageTemplate,
              layout: 'index',
              context: {
                filePath: node.pagePath,
                pageUrl: node.pagePath,
                title: node.title,
                site: sites[node.site].site,
                breadcrumbs: node.breadcrumbs,
                pageNavigation: node.navigation,
                feedbackEmail: node.feedbackEmail,
                layout: node.layout,
                navigation: sites[node.site].navigation,
                pageContent: node.pageContent,
                embedTargetSite: node.embedTargetSite,
              },
            }
            if (
              typeof node.drupalNid !== 'undefined' &&
              typeof upForms[parseInt(node.drupalNid)] !== 'undefined'
            ) {
              pageNode.context.upForms = upForms[parseInt(node.drupalNid)]
            }
            if (
              typeof node.drupalNid !== 'undefined' &&
              typeof upPages[parseInt(node.drupalNid)] !== 'undefined'
            ) {
              pageNode.context.upPages = upPages[parseInt(node.drupalNid)]
              pageNode.context.upPageID = parseInt(node.drupalNid)
            }
            if (typeof node.drupalNid !== 'undefined') {
              pageNode.context.drupalNid = node.drupalNid
            }
            if (typeof node.event !== 'undefined') {
              pageNode.context.event = node.event
            }
            if (node.topHero.image) {
              pageNode.context.topHero = node.topHero
            }
            createPage(pageNode)
          }
        })
        report.success(`built ${count} web pages`)
        return
      })
    )
  })
}
