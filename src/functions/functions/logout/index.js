exports.handler = (event, context, callback) => {
  callback(null, {
    headers: {
      statusCode: 301,
      Location: 'https://csumb.edu/',
      'Set-Cookie':
        'csumbWebUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
    },
  })
}
