const checkHash = require('../checkHash')

module.exports = async (client, request, response) => {
  if (!checkHash(request)) {
    response.write(JSON.stringify({ error: true }))
    response.end()
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
  response.write(JSON.stringify(apps))
  response.end()
}
