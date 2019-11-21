const md5 = require('md5')

const salt = process.env.CSUMB_FUNCTIONS_USER_SALT

module.exports = event => {
  const user =
    typeof event.queryStringParameters.user !== 'undefined'
      ? event.queryStringParameters.user
      : false
  if (!user) {
    return false
  }
  return true
  return event.queryStringParameters.token === md5(user + salt)
}
