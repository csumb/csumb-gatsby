const walk = require('walk')
const fs = require('fs-extra')
const crypto = require('crypto')

exports.sourceNodes = async ({ actions, createNodeId }, configOptions) => {
  const { createNode } = actions
  const allUsers = {}
  const departments = {}

  const allDepartments = fs.readJSONSync('./website-data/departments.json')
  allDepartments.forEach(department => {
    department.unit_code.forEach(code => {
      departments[code] = department
    })
  })

  const allDirectory = fs.readJSONSync('./website-data/directory.json')
  allDirectory.forEach(user => {
    if (
      typeof user.directoryDepartmentID !== 'undefined' &&
      Array.isArray(user.directoryDepartmentID)
    ) {
      user.fullDepartments = []
      user.directoryDepartmentID.forEach(code => {
        if (typeof departments[code] !== 'undefined') {
          user.fullDepartments.push(departments[code])
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
}
