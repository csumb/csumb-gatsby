const crypto = require('crypto')
const request = require('sync-request')

exports.sourceNodes = async (
  { actions, createNodeId, reporter },
  configOptions
) => {
  const { createNode } = actions
  const { endpoint } = configOptions

  fetchActivity = reporter.activityTimer(
    'Downloading redirects from CSUMB editor'
  )
  fetchActivity.start()

  const response = request('GET', `${endpoint}&type=redirects`)
  const redirects = JSON.parse(response.getBody())

  Object.keys(redirects.redirects).forEach(source => {
    const sourceAddress =
      source.search('://') > -1 ? source : '/' + source.replace(/^\//g, '')
    const target =
      redirects.redirects[source].search('://') > -1
        ? redirects.redirects[source]
        : '/' + redirects.redirects[source].replace(/^\//g, '')
    let redirectNode = {
      id: createNodeId(`${source} >>> CsumbContentRedirect`),
      children: [],
      redirect: {
        source: sourceAddress,
        target: target,
      },
      parent: null,
      internal: {
        type: `CsumbContentRedirect`,
      },
    }
    redirectNode.internal.contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(redirectNode))
      .digest(`hex`)
    createNode(redirectNode)
  })

  fetchActivity.end()
}
