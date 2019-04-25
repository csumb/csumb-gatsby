const functions = require('firebase-functions')
const oktaClient = require('@okta/okta-sdk-nodejs')
const oktaSecondaryEmail = require('./lib/okta/secondary-email')
const oktaSessionEnd = require('./lib/okta/secondary-email')
const oktaProfile = require('./lib/okta/profile')
const oktaLookup = require('./lib/okta/lookup')
const everbridgeGet = require('./lib/everbridge/get')
const everbridgePhone = require('./lib/everbridge/phone')
const laundry = require('./lib/laundry')
const laundryHall = require('./lib/laundry/hall')

const client = new oktaClient.Client({
  orgUrl: `https://${functions.config().okta.domain}`,
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

exports.laundry = functions.https.onRequest(laundry)

exports.laundryHall = functions.https.onRequest(laundryHall)
