const saml = require('samlify')
const metadata = require('./metadata')
const functions = require('firebase-functions')

const hosts = {
  local: {
    domain: 'localhost:8000',
    redirect: 'http://localhost:8000/dashboard',
    secure: '',
  },
  dev: {
    domain: 'csumb-gatsby-develop.firebaseapp.com',
    redirect: 'https://csumb-gatsby-develop.firebaseapp.com/dashboard',
    secure: '; Secure',
  },
  live: {
    domain: 'csumb.edu',
    redirect: 'https://csumb.edu/dashboard',
    secure: '; Secure',
  },
}

const host = hosts[functions.config().login.metadata]

const idp = saml.IdentityProvider({
  metadata: metadata.idp[functions.config().login.metadata],
})

const sp = saml.ServiceProvider({
  metadata: metadata.sp[functions.config().login.metadata],
})

module.exports = (client, request, response) => {
  sp.parseLoginResponse(idp, 'post', request)
    .then(parseResult => {
      client.response.set({
        'Set-Cookie': `csumbUser=${JSON.stringify(
          parseResult.extract.attributes
        )}; Domain=${host.domain}${host.secure}`,
      })
      response.redirect(host.redirect)
      response.end()
    })
    .catch(error => {
      response.send(JSON.stringify(error))
      response.end()
    })
}
