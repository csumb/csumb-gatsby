const saml2 = require('saml2-js')
const idp = require('./lib/idp')
const sp = require('./lib/sp')

const serviceProvider = new saml2.ServiceProvider(sp)
const identityProvider = new saml2.IdentityProvider(idp)

exports.handler = (event, context, callback) => {
  serviceProvider.post_assert(
    identityProvider,
    {
      request_body: event.queryStringParameters,
    },
    (err, saml_response) => {
      if (err != null) {
        console.log(err)
      }
      console.log(saml_response)
      callback(null, {
        body: 'Login!',
      })
    }
  )
}
