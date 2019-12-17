import client from '../../common/okta-client'
import checkHash from '../../common/check-hash'

exports.handler = async (event, context, callback) => {
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
