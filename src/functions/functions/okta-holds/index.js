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
        statusCode: 404,
        body: JSON.stringify({ success: false }),
      })
    })
    .then(oktaUser => {
      if (typeof oktaUser.profile.studentServiceIndicators === 'undefined') {
        callback(null, {
          statusCode: 404,
          body: JSON.stringify({ success: false }),
        })
        return
      }

      const holds = []
      oktaUser.profile.studentServiceIndicators.forEach(hold => {
        holds.push(JSON.parse(hold))
      })

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ success: true, holds: holds }),
      })
    })
}
