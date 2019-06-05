const crypto = require('crypto')
const request = require('sync-request')
const walk = require('walk')
const fs = require('fs-extra')

exports.sourceNodes = async (
  { actions, createNodeId, reporter },
  configOptions
) => {
  const { createNode } = actions
  const { endpoint } = configOptions

  const departmentNode = department => {
    const digest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(department))
      .digest(`hex`)
    let departmentNode = {
      id: createNodeId(`${department.uuid} >>> CsumbDepartment`),
      children: [],
      parent: null,
      internal: {
        type: `CsumbDepartment`,
        contentDigest: digest,
      },
    }
    departmentNode = Object.assign(department, departmentNode)

    createNode(departmentNode)
  }

  fetchActivity = reporter.activityTimer(
    'Downloading departments from CSUMB editor & building directory'
  )
  fetchActivity.start()

  const response = request('GET', `${endpoint}&type=departments`)
  const departments = JSON.parse(response.getBody())
  const allDepartments = {}
  departments.departments.forEach(department => {
    departmentNode(department)
    department.unit_code.forEach(code => {
      allDepartments[code] = department
    })
  })

  const allUsers = {}
  const allDirectory = fs.readJSONSync('./website-data/directory.json')
  allDirectory.forEach(user => {
    if (
      typeof user.directoryDepartmentID !== 'undefined' &&
      Array.isArray(user.directoryDepartmentID)
    ) {
      user.fullDepartments = []
      user.directoryDepartmentID.forEach(code => {
        if (typeof allDepartments[code] !== 'undefined') {
          user.fullDepartments.push(allDepartments[code])
        }
      })
    }
    allUsers[user.login.split('@').shift()] = user
  })

  walk.walkSync('./website-data/directory', {
    listeners: {
      file: async (root, fileStats, next) => {
        const fileName = `${root}/${fileStats.name}`
        const login = fileStats.name.replace('.json', '')
        if (typeof allUsers[login] !== 'undefined') {
          const contents = await fs.readJson(fileName)
          allUsers[login]._publicProfile = contents
        }
      },
    },
  })

  Object.keys(allUsers).forEach(id => {
    const directoryNode = {
      id: createNodeId(`${id} >>> CsumbDirectory`),
      children: [],
      parent: null,
      user: allUsers[id],
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

  fetchActivity.end()
}
