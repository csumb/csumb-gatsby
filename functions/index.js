const functions = require('firebase-functions')
const oktaClient = require('@okta/okta-sdk-nodejs')

const client = new oktaClient.Client({
  orgUrl: `https://${functions.config().okta.domain}`,
  token: functions.config().okta.key,
})

exports.updateSecondaryEmail = functions.https.onRequest(
  async (request, response) => {
    client
      .getSession(request.query.token)
      .then(session => {
        client
          .getUser(session.userId)
          .then(oktaUser => {
            oktaUser.profile.secondEmail = request.query.email
            oktaUser
              .update()
              .catch(error => {
                response.write(JSON.stringify({ error: true }))
                response.end()
              })
              .then(result => {
                response.write(JSON.stringify({ error: false }))
                response.end()
              })
          })
          .catch(error => {
            response.write(JSON.stringify({ error: true }))
            response.end()
          })
      })
      .catch(error => {
        response.write(JSON.stringify({ error: true }))
        response.end()
      })
  }
)
