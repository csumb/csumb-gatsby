import client from '../../common/okta-client'

exports.handler = async (event, context, callback) => {
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
