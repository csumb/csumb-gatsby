const checkHash = require('./lib/check-hash')

const oktaClient = require('@okta/okta-sdk-nodejs')

const client = new oktaClient.Client({
  orgUrl: 'csumb.okta.com',
  token: process.env.CSUMB_FUNCTIONS_OKTA_KEY,
})

exports.handler = (event, context, callback) => {
  if (!checkHash(event)) {
    callback(null, {
      statusCode: 403,
      body: JSON.stringify({ error: true }),
    })
    return
  }

  const apps = []
  await client.listAppLinks(event.queryStringParameters.user).each(app => {
    apps.push({
      id: app.id,
      label: app.label,
      linkUrl: app.linkUrl,
      sortOrder: app.sortOrder,
    })
  })
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(apps),
  })
}
