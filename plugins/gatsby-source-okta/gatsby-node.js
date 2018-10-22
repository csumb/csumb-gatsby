const crypto = require('crypto')
const okta = require('@okta/okta-sdk-nodejs')

const client = new okta.Client({
  orgUrl: process.env.OKTA_CLIENT_ORGURL,
  token: process.env.OKTA_CLIENT_TOKEN
});

exports.sourceNodes = async ({ actions , createNodeId }, configOptions) => {
  const { createNode } = actions
  client.listUsers(configOptions.filter).subscribe({
	interval: 1000,
  next(user) {
    const digest = crypto.createHash(`md5`)
      .update(JSON.stringify(user))
      .digest(`hex`)
    
    let profile = {}
    configOptions.fields.map(field => {
      if(typeof user.profile[field] === 'undefined') {
        return
      }
      profile[field] = user.profile[field]
    })

    const nodeData = {
      id: user.id,
      parent: null,
      children: [],
      profile: profile,
      internal: {
        type: `OktaUser`,
        contentDigest: digest
      }
    }

    createNode(nodeData)
  },
  error(err) {
    // handle error
  }
  });
}