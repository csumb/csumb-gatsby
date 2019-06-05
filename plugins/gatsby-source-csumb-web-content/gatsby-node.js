const walk = require('walk')
const fs = require('fs-extra')
const crypto = require('crypto')

const today = new Date()

exports.sourceNodes = async (
  { actions, createNodeId, reporter },
  configOptions
) => {
  const { createNode } = actions
  const loadActivity = reporter.activityTimer(
    'Loading content from Git Repository'
  )
  loadActivity.start()
  walk.walkSync('./website-data', {
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
  loadActivity.end()

  const parseContents = (name, content) => {
    if (name.search('/directory/') > -1) {
      return
    }
    if (name.search('directory.json') > -1) {
      return
    }
    if (name.search('building-redirects.json') > -1) {
      redirectNodes(content)
      return
    }
    if (name.search('departments.json') > -1) {
      departmentNodes(content)
      return
    }
    if (name.search('buildings.json') > -1) {
      buildingNodes(content)
      return
    }
    if (name.search('apps.json') > -1) {
      appNodes(content)
      return
    }
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
}
