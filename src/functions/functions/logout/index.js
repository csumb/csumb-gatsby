exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 301,
    headers: {
      Location: '/',
      'Set-Cookie':
        'csumbWebUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
    },
  })
}
