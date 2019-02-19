const walk = require('walk')
const fs = require('fs-extra')
const crypto = require('crypto')

exports.sourceNodes = async ({ actions, createNodeId }, configOptions) => {
  const { createNode } = actions

  walk.walkSync('./_web-content', {
    listeners: {
      file: async (root, fileStats, next) => {
        const fileName = `${root}/${fileStats.name}`
        if (fileName.search('.json') > -1) {
          const contents = await fs.readJson(fileName)
          parseContents(fileName, contents)
        }
        next()
      },
    },
  })

  const parseContents = (name, content) => {
    const digest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(content))
      .digest(`hex`)
    if (name.search('_site.json') > -1) {
      siteNode(name, content, digest)
      return
    }
    if (name.search('_data/public-directory/') > -1) {
      return
    }
    if (name.search('_navigation.json') > -1) {
      navigationNode(name, content, digest)
      return
    }
    if (name.search('_data/directory.json') > -1) {
      return
    }
    if (name.search('_data/departments.json') > -1) {
      departmentNodes(content)
      return
    }
    if (name.search('_data/buildings.json') > -1) {
      buildingNodes(content)
      return
    }
    if (name.search('_data/apps.json') > -1) {
      appNodes(content)
      return
    }
    if (typeof content.pageContent !== 'undefined') {
      pageNode(name, content, digest)
      return
    }
  }

  const pageNode = (name, content, digest) => {
    let topHero = {}
    if (
      content.pageContent.layout.length > 0 &&
      content.pageContent.blocks &&
      typeof content.pageContent.blocks[content.pageContent.layout[0].id] !==
        'undefined' &&
      content.pageContent.blocks[content.pageContent.layout[0].id] &&
      content.pageContent.blocks[content.pageContent.layout[0].id].type ===
        'heroimage'
    ) {
      topHero =
        content.pageContent.blocks[content.pageContent.layout[0].id].data
      content.pageContent.layout.splice(0, 1)
    }
    const breadcrumbs =
      typeof content.breadcrumb !== 'undefined'
        ? JSON.stringify(content.breadcrumb)
        : false
    const pagePath =
      content.site === content.path
        ? content.site
        : `${content.site}/${content.path}`
    const contentNode = {
      id: createNodeId(`${content.uuid} >>> CsumbPage`),
      children: [],
      parent: null,
      title: content.title,
      layout: content.layout,
      site: content.site,
      pagePath: pagePath,
      topHero: topHero,
      breadcrumbs: breadcrumbs,
      navigation: content.navigation ? content.navigation : [],
      feedbackEmail: content.feedback_email ? content.feedback_email : '',
      pageContent: JSON.stringify(content.pageContent),
      internal: {
        type: `CsumbPage`,
        contentDigest: digest,
      },
    }
    if (content.event) {
      contentNode.event = content.event
    }
    createNode(contentNode)
  }

  const siteNode = (name, content, digest) => {
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

  const navigationNode = (name, content, digest) => {
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

  const departmentNodes = content => {
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
}
