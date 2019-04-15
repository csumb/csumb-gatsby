const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)
const slugify = require('slugify')

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const graduateTemplate = path.resolve(
      `src/templates/departments/scienceillustration/graduate.js`
    )
    resolve(
      graphql(`
        {
          allAirtable(
            filter: {
              queryName: {
                in: [
                  "ScienceIllustrationGraduates"
                  "ScienceIllustrationImages"
                ]
              }
            }
          ) {
            edges {
              node {
                id
                table
                recordId
                data {
                  first_name
                  last_name
                  degrees
                  website
                  class
                  Images
                  slug
                  bio
                  title
                  caption
                  image {
                    url
                  }
                }
              }
            }
          }
          allCsumbNavigation(filter: { site: { eq: "scienceillustration" } }) {
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
        const images = {}
        result.data.allAirtable.edges.forEach(edge => {
          if (edge.node.table === 'Images') {
            images[edge.node.recordId] = edge.node
          }
        })
        result.data.allAirtable.edges.forEach(edge => {
          if (edge.node.table === 'Graduates') {
            const graduateImages = []
            if (edge.node.data.Images) {
              edge.node.data.Images.forEach(image => {
                if (typeof images[image] !== 'undefined') {
                  graduateImages.push(images[image])
                }
              })
            }
            const slug = slugify(
              `${edge.node.data.first_name} ${edge.node.data.last_name}`
            )
            createPage({
              path: `scienceillustration/graduate/${slug}`,
              component: graduateTemplate,
              context: {
                graduate: edge.node,
                images: graduateImages,
                navigation: result.data.allCsumbNavigation
                  ? result.data.allCsumbNavigation.edges[0].node.navigation
                  : '',
              },
            })
          }
        })

        report.success(`built science illustration pages.`)

        return
      })
    )
  })
}
