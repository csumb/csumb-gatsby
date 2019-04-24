const spawn = require('child_process').spawn
const functions = require('firebase-functions')

module.exports = (request, response) => {
  var executed = spawn('java', [
    '-jar',
    'lib/cashnet/csumbcashnet.jar',
    functions.config().cashnet.salt,
    'encrypt',
    request.query.user,
    '300',
  ])
  var results = ''
  executed.stdout.on('data', function(data) {
    results = results + data
  })

  executed.on('close', function(code) {
    const category =
      typeof request.query.category !== 'undefined'
        ? '&CNAME=' + request.query.category
        : ''
    console.log(
      `https://commerce.cashnet.com/csumbpay?eusername=${username}${category}`
    )
    const username = results
      .split('=')
      .pop()
      .trim()
    response.redirect(
      302,
      `https://commerce.cashnet.com/csumbpay?eusername=${username}${category}`
    )
    response.end()
  })
}
