const checkHash = require('./lib/check-hash')
const client = require('./lib/okta-client')

exports.handler = (event, context, callback) => {
  if (!checkHash(event)) {
    callback(null, {
      statusCode: 403,
      body: JSON.stringify({ error: true }),
    })
    return
  }

  const apps = []
  await client.listAppLinks(request.query.user).each(app => {
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
