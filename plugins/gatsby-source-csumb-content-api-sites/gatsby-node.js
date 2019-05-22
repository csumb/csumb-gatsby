const crypto = require("crypto")
const fetch = require("node-fetch")
const request = require("sync-request")

exports.sourceNodes = async (
  { actions, createNodeId, reporter },
  configOptions
) => {
  const { createNode } = actions
  const { endpoint } = configOptions

  const siteNode = content => {
    const digest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(content))
      .digest(`hex`)
    createNode({
      id: createNodeId(`${content.site} >>> CsumbSite`),
      parent: null,
      children: [],
      site: content.site,
      title: content.title,
      contact: content.contact ? content.contact : null,
      social: content.social ? content.social : null,
      staffPage: content.view_staff ? content.view_staff : null,
      internal: {
        type: `CsumbSite`,
        contentDigest: digest,
      },
    })
  }

  fetchActivity = reporter.activityTimer("Downloading sites from CSUMB editor")
  fetchActivity.start()

  const response = request("GET", `${endpoint}&type=sites`)
  const sites = JSON.parse(response.getBody())

  sites.sites.forEach(site => {
    siteNode(site)
  })

  fetchActivity.end()
}
