/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");

exports.createPages = ({ graphql, boundActionCreators }) => {
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
              }
            }
          }
        }
    `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create blog post pages.
        result.data.allFile.edges.forEach(edge => {
          createPage({
            path: `${edge.node.relativePath}`, // required
            component: pageTemplate,
            context: {
              
            },
          })
        })

        return
      })
    )
  })
}