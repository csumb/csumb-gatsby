const functions = require('firebase-functions')
const oktaClient = require('@okta/okta-sdk-nodejs')
const oktaSecondaryEmail = require('./lib/okta/secondary-email')
const oktaSessionEnd = require('./lib/okta/session-end')
const oktaProfile = require('./lib/okta/profile')
const oktaLookup = require('./lib/okta/lookup')
const oktaApps = require('./lib/okta/apps')
const everbridgeGet = require('./lib/everbridge/get')
const everbridgePhone = require('./lib/everbridge/phone')
const everbridgeOptOut = require('./lib/everbridge/opt-out')
const profileGet = require('./lib/profile/get')
const profileUpdate = require('./lib/profile/update')
const profileUpdateBio = require('./lib/profile/bio')
const feedback = require('./lib/feedback')
const alumni = require('./lib/alumni')
const login = require('./lib/login')

const client = new oktaClient.Client({
  orgUrl: functions.config().okta.domain,
  token: functions.config().okta.key,
})

exports.oktaSecondaryEmail = functions.https.onRequest((request, response) => {
  oktaSecondaryEmail(client, request, response)
})

exports.alumni = functions.https.onRequest((request, response) => {
  alumni(client, request, response)
})

exports.oktaSessionEnd = functions.https.onRequest((request, response) => {
  oktaSessionEnd(client, request, response)
})

exports.oktaLookup = functions.https.onRequest((request, response) => {
  oktaLookup(client, request, response)
})

exports.oktaProfile = functions.https.onRequest((request, response) => {
  oktaProfile(client, request, response)
})

exports.oktaApps = functions.https.onRequest((request, response) => {
  oktaApps(client, request, response)
})

exports.everbridgeGet = functions.https.onRequest((request, response) => {
  everbridgeGet(client, request, response)
})

exports.everbridgePhone = functions.https.onRequest((request, response) => {
  everbridgePhone(client, request, response)
})

exports.everbridgeOptOut = functions.https.onRequest((request, response) => {
  everbridgeOptOut(client, request, response)
})

exports.profileGet = functions.https.onRequest((request, response) => {
  profileGet(client, request, response)
})

exports.profileUpdate = functions.https.onRequest((request, response) => {
  profileUpdate(client, request, response)
})

exports.profileUpdateBio = functions.https.onRequest((request, response) => {
  profileUpdateBio(client, request, response)
})

exports.feedback = functions.https.onRequest(feedback)

exports.login = functions.https.onRequest(login)

exports.logout = functions.https.onRequest((request, response) => {
  response.cookie('csumbUser', '', {
    path: '/',
    expires: new Date(0),
  })
  response.cookie('csumbSession', '', {
    path: '/',
    expires: new Date(0),
  })
  response.redirect('https://csumb.edu')
})
