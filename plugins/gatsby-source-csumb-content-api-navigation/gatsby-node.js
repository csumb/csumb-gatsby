const crypto = require('crypto')
const request = require('sync-request')

exports.sourceNodes = async (
  { actions, createNodeId, reporter },
  configOptions
) => {
  const { createNode } = actions
  const { endpoint } = configOptions
  const navigationNode = content => {
    const digest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(content))
      .digest(`hex`)
    createNode({
      id: createNodeId(`${content.site} >>> CsumbNavigation`),
      parent: null,
      children: [],
      site: content.site,
      navigation: JSON.stringify(content.navigation),
      internal: {
        type: `CsumbNavigation`,
        contentDigest: digest,
      },
    })
  }

  fetchActivity = reporter.activityTimer(
    'Downloading navigation from CSUMB editor'
  )
  fetchActivity.start()

  let nextUrl = `${endpoint}&type=navigation`
  while (nextUrl) {
    const response = request('GET', nextUrl)
    const navigation = JSON.parse(response.getBody())
    if (navigation) {
      navigation.navigation.forEach(item => {
        navigationNode(item)
      })
      nextUrl = navigation.next
    } else {
      nextUrl = false
    }
  }

  fetchActivity.end()
}
