const fs = require('fs-extra')
const crypto = require('crypto')

exports.sourceNodes = async ({ actions, createNodeId, reporter }) => {
  const { createNode } = actions
  const loadActivity = reporter.activityTimer(
    'Loading content from Git Repository'
  )

  const redirectNodes = content => {
    Object.keys(content).forEach(source => {
      let redirectNode = {
        id: createNodeId(`${source} >>> CsumbRedirect`),
        children: [],
        redirect: {
          source: source,
          target: content[source],
        },
        parent: null,
        internal: {
          type: `CsumbRedirect`,
        },
      }
      redirectNode.internal.contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(redirectNode))
        .digest(`hex`)
      createNode(redirectNode)
    })
  }

  const buildingNodes = content => {
    Object.values(content).forEach(building => {
      const buildingNode = {
        id: createNodeId(`${building.code} >>> CsumbBuilding`),
        children: [],
        parent: null,
        code: building.code,
        buildingName: building.name,
        center: building.center,
        outline: building.outline,
        address: building.address,
        mailingAddress: building.mailingAddress,
        internal: {
          type: `CsumbBuilding`,
        },
      }
      buildingNode.internal.contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(buildingNode))
        .digest(`hex`)
      createNode(buildingNode)
    })
  }

  const appNodes = content => {
    content.forEach(app => {
      const appNode = {
        id: createNodeId(`${app.url} >>> CsumbApp`),
        children: [],
        parent: null,
        name: app.name,
        url: app.url,
        internal: {
          type: `CsumbApp`,
        },
      }
      appNode.internal.contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(appNode))
        .digest(`hex`)
      createNode(appNode)
    })
  }

  loadActivity.start()

  const redirects = fs.readJSONSync('./website-data/building-redirects.json')
  redirectNodes(redirects)

  const buildings = fs.readJSONSync('./website-data/buildings.json')
  buildingNodes(buildings)

  const apps = fs.readJSONSync('./website-data/apps.json')
  appNodes(apps)

  loadActivity.end()
}
