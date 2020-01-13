import saml2 from 'saml2-js'
import querystring from 'querystring'
import md5 from 'md5'
import idp from './idp'
import sp from './sp'

const salt = process.env.CSUMB_FUNCTIONS_USER_SALT
const domain = 'csumb.edu'
const serviceProvider = new saml2.ServiceProvider(sp)
const identityProvider = new saml2.IdentityProvider(idp)

const fields = {
  single: [
    'login',
    'firstName',
    'lastName',
    'email',
    'secondEmail',
    'employeeNumber',
  ],
  array: [
    'roles',
    'directoryTitle',
    'directoryDepartment',
    'provisionalServices',
  ],
}

exports.handler = (event, context, callback) => {
  const body = querystring.parse(event.body)
  serviceProvider.post_assert(
    identityProvider,
    {
      request_body: body,
    },
    (err, saml_response) => {
      if (err != null) {
        console.log(err)
      }
      const { attributes } = saml_response.user

      const user = {}
      fields.single.forEach(field => {
        if (typeof attributes[field] !== 'undefined') {
          user[field] = attributes[field][0]
        }
      })
      fields.array.forEach(field => {
        if (
          typeof attributes[field] !== 'undefined' &&
          typeof attributes[field][0] !== 'undefined'
        ) {
          user[field] = attributes[field][0].split(',')
        }
      })
      user.token = md5(user.login.split('@').shift() + salt)
      const cookie = `csumbWebUser=${encodeURIComponent(
        JSON.stringify(user)
      )}; SameSite=None Secure; Domain=${domain}; Path=/`
      if (typeof body.RelayState !== 'undefined' && body.RelayState) {
        callback(null, {
          statusCode: 301,
          headers: {
            Location: `https://${domain}/${request.body.RelayState}`,
            'Set-cookie': cookie,
          },
        })
      } else {
        callback(null, {
          statusCode: 301,
          headers: {
            Location: `https://${domain}/`,
            'Set-cookie': cookie,
          },
        })
      }
    }
  )
}
