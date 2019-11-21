const saml = require('samlify')
const metadata = require('./lib/saml-metadata')
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
  netlify: {
    redirect: 'https://csumb-edu.netlify.com/dashboard',
    domain: 'https://csumb-edu.netlify.com',
  },
}
const salt = process.env.CSUMB_FUNCTIONS_USER_SALT
const instance = process.env.CSUMB_FUNCTIONS_LOGIN_INSTANCE
const host = hosts[instance]
const idp = saml.IdentityProvider({
  metadata: metadata.idp[instance],
})

const sp = saml.ServiceProvider({
  metadata: metadata.sp[instance],
})

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body)
  sp.parseLoginResponse(idp, 'post', event)
    .then(parseResult => {
      const user = parseResult.extract.attributes
      user.token = md5(user.login.split('@').shift() + salt)
      response.cookie('csumbUser', JSON.stringify(user), {
        path: '/',
      })
      if (typeof body.RelayState !== 'undefined' && body.RelayState) {
        callback(null, {
          statusCode: 301,
          headers: {
            Location: host.domain + body.RelayState,
          },
        })
      } else {
        callback(null, {
          statusCode: 301,
          headers: {
            Location: host.redirect,
          },
        })
      }
      response.end()
    })
    .catch(error => {
      console.log(error)
      callback(null, {
        statusCode: 301,
        headers: {
          Location: host.redirect,
        },
      })
    })
}
