exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 302,
    headers: {
      Location: '/',
      'Set-Cookie':
        'csumbWebUser=;  Secure; Domain=csumb.edu; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
    },
  })
}
