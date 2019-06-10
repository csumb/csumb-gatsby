const saml = require('samlify')
const metadata = require('./metadata')
const functions = require('firebase-functions')
const bcrypt = require('bcrypt')

const hosts = {
  local: {
    domain: 'localhost:5000',
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
const { instance, salt } = functions.config().login
const host = hosts[instance]

const idp = saml.IdentityProvider({
  metadata: metadata.idp[instance],
})

const sp = saml.ServiceProvider({
  metadata: metadata.sp[instance],
})

module.exports = (client, request, response) => {
  sp.parseLoginResponse(idp, 'post', request)
    .then(parseResult => {
      response.set({
        'Set-Cookie': `csumbUser=${JSON.stringify(
          parseResult.extract.attributes
        )}; Domain=${host.domain}; Path=/${host.secure}`,
      })
      bcrypt.hash(parseResult.extract.attributes.login + salt, 10, function(
        err,
        hash
      ) {
        response.set({
          'Set-Cookie': `csumbSession=${hash}; Domain=${host.domain}; Path=/${
            host.secure
          }`,
        })
        if (instance === 'local') {
          console.log(
            `csumbUser=${JSON.stringify(parseResult.extract.attributes)}`
          )
          console.log(`csumbSession=${hash}`)
        }
        response.redirect(host.redirect)
        response.end()
      })
    })
    .catch(error => {
      console.log(error)
      response.redirect(host.redirect)
      response.end()
    })
}
