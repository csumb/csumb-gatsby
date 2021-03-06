import client from '../../common/okta-client'
import checkHash from '../../common/check-hash'

exports.handler = (event, context, callback) => {
  if (!checkHash(event)) {
    callback(null, {
      statusCode: 403,
      body: JSON.stringify({ error: true }),
    })
    return
  }

  client
    .getUser(event.queryStringParameters.user)
    .catch(error => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ success: false }),
      })
    })
    .then(oktaUser => {
      if (
        typeof oktaUser.profile.provisionalServices == 'undefined' ||
        oktaUser.profile.provisionalServices.length == 0
      ) {
        oktaUser.profile.provisionalServices = []
      }
      if (oktaUser.profile.provisionalServices.indexOf('alumni') > -1) {
        return
      }
      oktaUser.profile.provisionalServices.push('alumni')
      oktaUser
        .update()
        .then(result => {
          response.send(JSON.stringify({ success: true }))
          return response.end()
        })
        .catch(error => {})
      return true
    })
    .catch(error => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ success: false }),
      })
    })
}
