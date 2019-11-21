const saml2 = require('saml2-js')
const idp = require('./lib/idp')
const sp = require('./lib/sp')
const querystring = require('querystring')
const md5 = require('md5')
const salt = process.env.CSUMB_FUNCTIONS_USER_SALT
const serviceProvider = new saml2.ServiceProvider(sp)
const identityProvider = new saml2.IdentityProvider(idp)

exports.handler = (event, context, callback) => {
  const body = querystring(event.body)
  serviceProvider.post_assert(
    identityProvider,
    {
      request_body: body,
    },
    (err, saml_response) => {
      if (err != null) {
        console.log(err)
      }
      const user = saml_response.user.attributes
      user.token = md5(user.login.split('@').shift() + salt)
      console.log(user)
      const cookie = `csumbUser=${JSON.stringify(
        user
      )}; Secure; Domain=csumb-edu.netlify.com`
      if (typeof body.RelayState !== 'undefined' && body.RelayState) {
        callback(null, {
          status: 301,
          headers: {
            Location: request.body.RelayState,
            'Set-cookie': cookie,
          },
        })
      } else {
        callback(null, {
          status: 301,
          headers: {
            Location: '/',
            'Set-cookie': cookie,
          },
        })
      }
    }
  )
}
