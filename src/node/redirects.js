module.exports = (graphql, actions) => {
  const { createRedirect } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allCsumbContentRedirect {
            edges {
              node {
                redirect {
                  source
                  target
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
          return
        }

        result.data.allCsumbContentRedirect.edges.forEach(({ node }) => {
          createRedirect({
            fromPath: node.redirect.source,
            toPath: node.redirect.target,
            isPermanent: true,
          })
        })

        return
      })
    )
  })
}
