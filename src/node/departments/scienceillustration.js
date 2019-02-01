const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const graduateTemplate = path.resolve(
      `src/templates/departments/scienceillustration/graduate.js`
    )
    resolve(
      graphql(
        `
          {
            allAirtable(filter: { table: { in: ["Graduates", "Images"] } }) {
              edges {
                node {
                  id
                  table
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
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
          return
        }

        const images = {}
        result.data.allAirtable.edges.forEach(edge => {
          if (edge.node.table === 'Images') {
            images[edge.node.id] = edge.node
          }
        })
        result.data.allAirtable.edges.forEach(edge => {
          if (edge.node.table === 'Graduates') {
            const graduateImages = []
            edge.node.data.Images.forEach(image => {
              if (typeof images[image] !== 'undefined') {
                graduateImages.push(images[image])
              }
            })
            createPage({
              path: `scienceillustration/graduate/${edge.node.slug}`,
              component: graduateTemplate,
              context: {
                graduate: edge.node,
                images: graduateImages,
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
