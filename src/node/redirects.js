const report = require(`gatsby-cli/lib/reporter`)

module.exports = (graphql, actions) => {
  const { createRedirect } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allCsumbRedirects {
              edges {
                node {
                  path
                  target
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
        result.data.allCsumbRedirects.edges.forEach(async edge => {
          createRedirect({
            fromPath: `/${edge.node.path}`,
            toPath:
              edge.node.target.search(/http(s)?:\/\//) > -1
                ? edge.node.target
                : `/${edge.node.target}`,
            isPermanent: true,
          })
        })
        report.success(`built redirects`)
        return
      })
    )
  })
}
