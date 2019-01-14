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
  try {
    content = JSON.parse(content)
  } catch (e) {
    console.log(`JSON error in file ${node.relativePath}`)
    content = false
  }
  if (!content) {
    return
  }

  let contentNode = false
  if (typeof content.pageContent !== 'undefined') {
    let topHero = {}
    if (content.pageContent.blocks[content.pageContent.layout[0].id].type == 'heroimage') {
      topHero = content.pageContent.blocks[content.pageContent.layout[0].id].data
      content.pageContent.layout.splice(0, 1)
    }
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
      topHero: topHero,
      breadcrumbs: breadcrumbs,
      navigation: content.navigation ? content.navigation : [],
      feedbackEmail: content.feedback_email ? content.feedback_email : '',
      pageContent: JSON.stringify(content.pageContent),
      internal: {
        type: `CsumbContentPage`,
      },
    }
    if (content.event) {
      contentNode.event = content.event
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

  if (node.relativePath.search('_data/departments.json') > -1) {
    content.forEach(department => {
      let departmentNode = {
        id: createNodeId(`${department.uuid} >>> CsumbDepartment`),
        children: [],
        parent: null,
        internal: {
          type: `CsumbDepartment`,
        },
      }
      departmentNode = Object.assign(department, departmentNode)
      departmentNode.internal.contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(departmentNode))
        .digest(`hex`)
      createNode(departmentNode)
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
        center: building.center,
        outline: building.outline,
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

  if (node.relativePath.search('_data/apps.json') > -1) {
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

  if (node.relativePath.search('_data/redirects.json') > -1) {
    for (path in content) {
      const redirectNode = {
        id: createNodeId(`${path} >>> CsumbRedirects`),
        children: [],
        parent: null,
        path: path,
        target: content[path],
        internal: {
          type: `CsumbRedirects`,
        },
      }
      redirectNode.internal.contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(redirectNode))
        .digest(`hex`)
      createNode(redirectNode)
    }
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
