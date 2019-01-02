const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)
const crypto = require('crypto')

const encryptFeedback = (email) => {
  if (!email) {
    return null
  }
  const cipher = crypto.createCipher('aes-256-ctr', process.env.CSUMB_FEEDBACK_KEY)
  let crypted = cipher.update(email, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
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
          }
        `
      ).then(result => {
        if (!result.data) {
          return
        }
        let count = 0

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
                pageUrl: path,
                title: content.title,
                site: sites[content.site].site,
                breadcrumbs: content.breadcrumbs,
                feedbackEmail: encryptFeedback(content.feedbackEmail),
                layout: content.layout,
                navigation: sites[content.site].navigation,
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
