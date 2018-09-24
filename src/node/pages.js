
const path = require(`path`)
const fs = require(`fs-extra`)
require(`gatsby-source-filesystem`)
 
module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`src/templates/page.js`)
    // Query for JSON content nodes to use in creating pages. We filter out any .git files
    resolve(
      graphql(
        `
        {
          allFile(filter: {
              relativePath: {regex: "/^(?!.git\/*)/"}
              extension: {eq: "json"}
            }) {
            edges {
              node {
                relativePath
                absolutePath
              }
            }
          }
        }
    `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        result.data.allFile.edges.forEach(async edge => {
          const pagePath = edge.node.relativePath.replace('.json', '.html')
          const fileContent = fs.readFileSync(edge.node.absolutePath, `utf-8`);
          createPage({
            path: pagePath,
            component: pageTemplate,
            layout: 'index',
            context: {
              filePath: edge.node.relativePath,
              pageContent: fileContent
            }
          })
          
        })

        return
      })
    )
  })
}