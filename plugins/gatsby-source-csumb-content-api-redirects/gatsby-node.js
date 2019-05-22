const crypto = require('crypto')
const fetch = require('node-fetch')
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
    let redirectNode = {
      id: createNodeId(`${source} >>> CsumbContentRedirect`),
      children: [],
      redirect: {
        source: source,
        target: redirects.redirects[source],
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
