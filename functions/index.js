const functions = require('firebase-functions')
const oktaClient = require('@okta/okta-sdk-nodejs')
const oktaSecondaryEmail = require('./lib/okta/secondary-email')
const oktaSessionEnd = require('./lib/okta/session-end')
const oktaProfile = require('./lib/okta/profile')
const oktaLookup = require('./lib/okta/lookup')
const everbridgeGet = require('./lib/everbridge/get')
const everbridgePhone = require('./lib/everbridge/phone')
const everbridgeOptOut = require('./lib/everbridge/opt-out')
const laundry = require('./lib/laundry')
const laundryHall = require('./lib/laundry/hall')
const profileGet = require('./lib/profile/get')
const profileUpdate = require('./lib/profile/update')
const feedback = require('./lib/feedback')
const nameBadge = require('./lib/name-badge')
const login = require('./lib/login')

const client = new oktaClient.Client({
  orgUrl: functions.config().okta.domain,
  token: functions.config().okta.key,
})

exports.oktaSecondaryEmail = functions.https.onRequest((request, response) => {
  oktaSecondaryEmail(client, request, response)
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

exports.laundry = functions.https.onRequest(laundry)

exports.laundryHall = functions.https.onRequest(laundryHall)

exports.feedback = functions.https.onRequest(feedback)

exports.nameBadge = functions.https.onRequest(nameBadge)

exports.login = functions.https.onRequest(login)
