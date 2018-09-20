const fetch = require('node-fetch')
const crypto = require('crypto')

exports.sourceNodes = async ({ actions , createNodeId }, configOptions) => {
  const { createNode } = actions

  try {
    const response = await fetch(configOptions.sheet)
    const body = await response.json()

    body.feed.entry.forEach((item, key) => {
      let row = {}
      configOptions.fields.forEach(field => {
        row[field] = item[`gsx\$${field}`].$t
      })
      const digest = crypto.createHash(`md5`)
        .update(JSON.stringify(row))
        .digest(`hex`)

      const nodeData = {
        id: item.id.$t,
        parent: null,
        children: [],
        sheet: configOptions.id,
        row: row,
        internal: {
          type: `GooglePublicSheet`,
          contentDigest: digest
        }
      }

      createNode(nodeData)
    })
  
  }
  catch (error) {
    console.log(error)
  }

}