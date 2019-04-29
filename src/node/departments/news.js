const path = require('path')
const report = require('gatsby-cli/lib/reporter')
const moment = require('moment')

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const newsStoryTemplate = path.resolve(
      'src/templates/departments/news/story.js'
    )
    const tagListTemplate = path.resolve(
      'src/templates/departments/news/tag-list.js'
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
                teaserHeadline
                teaserImage {
                  file {
                    url
                    fileName
                    contentType
                  }
                }
                childContentfulNewsStoryTeaserDescriptionTextNode {
                  teaserDescription
                }
                childContentfulNewsStoryLeadParagraphTextNode {
                  leadParagraph
                }
                tags {
                  id
                  name
                  slug
                }
                homepageStory {
                  id
                }
                childContentfulNewsStoryMainContentRichTextNode {
                  mainContent
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

        const tags = {}

        result.data.allContentfulNewsStory.edges.forEach(edge => {
          const { node } = edge
          const publishDate = moment(node.goLiveDate)
          if (publishDate.isSameOrBefore()) {
            if (node.tags) {
              node.tags.forEach(tag => {
                if (typeof tags[tag.id] === 'undefined') {
                  tags[tag.id] = {
                    slug: tag.slug,
                    name: tag.name,
                    stories: [],
                  }
                }
                tags[tag.id].stories.push(node)
              })
            }
            const pathDate = publishDate.format('YYYY/MMM/D').toLowerCase()
            createPage({
              path: `news/${pathDate}/${node.slug}`,
              component: newsStoryTemplate,
              context: {
                story: node,
                navigation:
                  result.data.allCsumbNavigation &&
                  result.data.allCsumbNavigation.edges &&
                  typeof result.data.allCsumbNavigation.edges[0] !== 'undefined'
                    ? result.data.allCsumbNavigation.edges[0].node.navigation
                    : '',
              },
            })
          }
        })

        Object.keys(tags).forEach(id => {
          const tag = tags[id]

          createPage({
            path: `news/tag/${tag.slug}`,
            component: tagListTemplate,
            context: {
              tag: tag,
              stories: tag.stories,
              navigation:
                result.data.allCsumbNavigation &&
                result.data.allCsumbNavigation.edges &&
                typeof result.data.allCsumbNavigation.edges[0] !== 'undefined'
                  ? result.data.allCsumbNavigation.edges[0].node.navigation
                  : '',
            },
          })
        })

        report.success(`built news pages.`)

        return
      })
    )
  })
}
