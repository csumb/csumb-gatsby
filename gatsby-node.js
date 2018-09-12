/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const fs = require(`fs-extra`)
require(`gatsby-source-filesystem`)
/*
exports.onCreateNode = async ({ node, loadNodeContent, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if(node.internal.type !== 'File' || node.relativePath.search('.json') === -1) {
    return;
  }
  const fileContent = await loadNodeContent(node)
  createNodeField({
    node,
    name: `pageContent`,
    value: fileContent
  })
};*/

exports.createPages = ({ graphql, loadNodeContent, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`src/templates/page.js`)
    // Query for JSON content nodes to use in creating pages. We filter out any .git files
    resolve(
      graphql(
        `
        {
          allFile(filter: {
              relativePath: {regex: "/^(?!.git\/*)/"}
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