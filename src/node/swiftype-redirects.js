const report = require(`gatsby-cli/lib/reporter`)
const path = require('path')

module.exports = (graphql, actions) => {
  const { createPage } = actions
  const redirectTemplate = path.resolve(`src/templates/swiftype-redirect.js`)
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allCsumbSwiftypeRedirect {
              edges {
                node {
                  redirect {
                    path
                    name
                    url
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
        result.data.allCsumbSwiftypeRedirect.edges.forEach(async edge => {
          createPage({
            path: `_redirect/${edge.node.redirect.path}`,
            component: redirectTemplate,
            context: {
              redirect: edge.node.redirect,
            },
          })
        })
        report.success(`built redirects`)
        return
      })
    )
  })
}
