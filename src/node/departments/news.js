const path = require('path')
const report = require('gatsby-cli/lib/reporter')
const moment = require('moment')

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const newsStoryTemplate = path.resolve(
      'src/templates/departments/news/story.js'
    )
    resolve(
      graphql(`
        {
          allContentfulNewsStory {
            edges {
              node {
                contentful_id
                slug
                title
                goLiveDate
                bylineName
                bylineDate
                childContentfulNewsStoryLeadParagraphTextNode {
                  leadParagraph
                }
                tags {
                  id
                }
                homepageStory {
                  id
                }
                childContentfulNewsStoryMainContentRichTextNode {
                  childContentfulRichText {
                    html
                  }
                }
              }
            }
          }
          allCsumbNavigation(filter: { site: { eq: "news" } }) {
            edges {
              node {
                navigation
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
          return
        }

        result.data.allContentfulNewsStory.edges.forEach(edge => {
          const { node } = edge
          const publishDate = moment(node.goLiveDate)
          if (publishDate.isSameOrBefore()) {
            const pathDate = publishDate.format('YYYY/MMM/D').toLowerCase()
            createPage({
              path: `news/${pathDate}/${node.slug}`,
              component: newsStoryTemplate,
              context: {
                story: node,
                navigation: result.data.allCsumbNavigation
                  ? result.data.allCsumbNavigation.edges[0].node.navigation
                  : '',
              },
            })
          }
        })

        report.success(`built news pages.`)

        return
      })
    )
  })
}
