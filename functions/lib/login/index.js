const saml = require('samlify')
const metadata = require('./metadata')
const functions = require('firebase-functions')
const md5 = require('md5')

const hosts = {
  local: {
    redirect: 'http://localhost:8000/dashboard',
    domain: 'http://localhost:8000',
    secure: false,
  },
  dev: {
    redirect: 'https://csumb-gatsby-develop.firebaseapp.com/dashboard',
    domain: 'https://csumb-gatsby-develop.firebaseapp.com',
  },
  live: {
    redirect: 'https://csumb.edu/dashboard',
    domain: 'https://csumb.edu',
  },
}
const { instance, salt } = functions.config().login
const host = hosts[instance]
const idp = saml.IdentityProvider({
  metadata: metadata.idp[instance],
})

const sp = saml.ServiceProvider({
  metadata: metadata.sp[instance],
})

module.exports = (request, response) => {
  sp.parseLoginResponse(idp, 'post', request)
    .then(parseResult => {
      response.cookie(
        'csumbUser',
        JSON.stringify(parseResult.extract.attributes),
        {
          path: '/',
        }
      )
      response.cookie(
        'csumbSession',
        md5(parseResult.extract.attributes.login.split('@').shift() + salt),
        {
          path: '/',
        }
      )
      if (
        typeof request.body.RelayState !== 'undefined' &&
        request.body.RelayState
      ) {
        response.redirect(host.domain + request.body.RelayState)
      } else {
        response.redirect(host.redirect)
      }
      response.end()
    })
    .catch(error => {
      console.log(error)
      response.redirect(host.redirect)
      response.end()
    })
}
