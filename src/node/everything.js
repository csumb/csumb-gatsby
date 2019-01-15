const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const courseTemplate = path.resolve(`src/templates/building.js`)
    resolve(
      graphql(
        `
          {
            allContentfulNavigationItem(sort: { fields: [title] }) {
              edges {
                node {
                  contentful_id
                  title
                  link
                  slug
                  topLevelItem
                  childContentfulNavigationItemDescriptionTextNode {
                    childMarkdownRemark {
                      html
                    }
                  }
                  contentfulchildren {
                    contentful_id
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
        let topLevelItems = []
        let allItems = {}
        result.data.allContentfulNavigationItem.edges.forEach(edge => {
          if (edge.node.topLevelItem) {
            topLevelItems.push(edge.node)
          }
          allItems[edge.node.contentful_id] = edge.node
        })

        createPage({
          path: 'everything',
          component: path.resolve('src/templates/everything/index.js'),
          context: {
            topLevelItems: topLevelItems,
          },
        })

        topLevelItems.forEach(topItem => {
          if (topItem.contentfulchildren.length) {
            let subItems = []
            topItem.contentfulchildren.forEach(child => {
              subItems.push(allItems[child.contentful_id])
            })
            createPage({
              path: `everything/${topItem.slug}`,
              component: path.resolve('src/templates/everything/sub-item.js'),
              context: {
                topLevelItems: topLevelItems,
                currentItems: subItems,
                currentItem: topItem,
              },
            })
            subItems.forEach(subItem => {
              if (typeof subItem.contentfulchildren !== 'undefined') {
                let subSubItems = []
                subItem.contentfulchildren.forEach(subSubItem => {
                  subSubItems.push(allItems[subSubItem.contentful_id])
                })
                createPage({
                  path: `everything/${topItem.slug}/${subItem.slug}`,
                  component: path.resolve(
                    'src/templates/everything/sub-sub-item.js'
                  ),
                  context: {
                    topLevelItems: topLevelItems,
                    topLevelItem: topItem,
                    secondLevelItems: subItems,
                    currentItems: subSubItems,
                    currentItem: subItem,
                  },
                })
              }
            })
          }
        })

        report.success(`built everything navigation pages.`)

        return
      })
    )
  })
}
