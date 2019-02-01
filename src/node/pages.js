const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)
const cryptex = require('node-cryptex')

const encryptFeedback = email => {
  if (!email) {
    return null
  }
  const iv = new Buffer.alloc(16)
  return cryptex.encrypt(email, process.env.CSUMB_FEEDBACK_KEY, iv)
}

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
                  topHero {
                    headline
                    text
                    buttonUrl
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
        `
      ).then(result => {
        if (!result.data) {
          report.error(`Could not query content pages.`)
          return
        }
        const overridePages = result.data.site.siteMetadata.overridePages
        let count = 0

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
                feedbackEmail: encryptFeedback(node.feedbackEmail),
                layout: node.layout,
                navigation: sites[node.site].navigation,
                pageContent: node.pageContent,
              },
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
        resolve()
      })
    )
  })
}
