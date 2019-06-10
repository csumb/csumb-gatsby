const saml = require('samlify')
const metadata = require('./metadata')
const functions = require('firebase-functions')
const md5 = require('md5')

const hosts = {
  local: {
    domain: 'localhost:5000',
    redirect: 'http://localhost:8000/dashboard',
    secure: false,
  },
  dev: {
    domain: 'csumb-gatsby-develop.firebaseapp.com',
    redirect: 'https://csumb-gatsby-develop.firebaseapp.com/dashboard',
    secure: true,
  },
  live: {
    domain: 'csumb.edu',
    redirect: 'https://csumb.edu/dashboard',
    secure: true,
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
          domain: host.domain,
          path: '/',
          secure: host.secure,
        }
      )
      response.cookie(
        'csumbSession',
        md5(parseResult.extract.attributes.login.split('@').shift + salt),
        {
          domain: host.domain,
          path: '/',
          secure: host.secure,
        }
      )
      response.redirect(host.redirect)
      response.end()
    })
    .catch(error => {
      console.log(error)
      response.redirect(host.redirect)
      response.end()
    })
}
