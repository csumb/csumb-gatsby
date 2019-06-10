const functions = require('firebase-functions')
const md5 = require('md5')

const { salt } = functions.config().login

module.exports = request => {
  return request.query.token === md5(request.query.user + salt)
}
