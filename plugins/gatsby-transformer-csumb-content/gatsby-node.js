const crypto = require(`crypto`)

exports.onCreateNode = async ({
  node,
  loadNodeContent,
  actions,
  createNodeId,
}) => {
  const { createNode, createParentChildLink } = actions
  if (node.extension !== `json` || node.sourceInstanceName !== 'web-content') {
    return
  }
  let content = await loadNodeContent(node)
  content = JSON.parse(content)

  let contentNode = false
  if (typeof content.pageContent !== 'undefined') {
    const breadcrumbs =
      typeof content.breadcrumb !== 'undefined'
        ? JSON.stringify(content.breadcrumb)
        : false
    contentNode = {
      id: createNodeId(`${node.id} >>> CsumbContentPage`),
      children: [],
      parent: node.id,
      title: content.title,
      layout: content.layout,
      site: content.site,
      breadcrumbs: breadcrumbs,
      pageContent: JSON.stringify(content.pageContent),
      internal: {
        type: `CsumbContentPage`,
      },
    }
  }

  if (node.relativePath.search('_site.json') > -1) {
    contentNode = {
      id: createNodeId(`${node.id} >>> CsumbContentSite`),
      children: [],
      parent: null,
      site: content.site,
      title: content.title,
      internal: {
        type: `CsumbContentSite`,
      },
    }
  }

  if (node.relativePath.search('_navigation.json') > -1) {
    contentNode = {
      id: createNodeId(`${node.id} >>> CsumbContentNavigation`),
      children: [],
      parent: null,
      site: content.site,
      navigation: JSON.stringify(content.navigation),
      internal: {
        type: `CsumbContentNavigation`,
      },
    }
  }

  if (node.relativePath.search('_data/directory.json') > -1) {
    content.forEach(user => {
      const directoryNode = {
        id: createNodeId(`${user.email} >>> CsumbDirectory`),
        children: [],
        parent: null,
        user: user,
        internal: {
          type: `CsumbDirectory`,
        },
      }
      directoryNode.internal.contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(directoryNode))
        .digest(`hex`)
      createNode(directoryNode)
    })
  }

  if (node.relativePath.search('_data/buildings.json') > -1) {
    Object.values(content).forEach(building => {
      const buildingNode = {
        id: createNodeId(`${building.code} >>> CsumbBuilding`),
        children: [],
        parent: null,
        code: building.code,
        buildingName: building.name,
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

  if (!contentNode) {
    return
  }

  contentNode.internal.contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(contentNode))
    .digest(`hex`)

  createNode(contentNode)
  if (contentNode.parent) {
    createParentChildLink({ parent: node, child: contentNode })
  }
}
