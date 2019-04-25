const functions = require('firebase-functions')
const oktaClient = require('@okta/okta-sdk-nodejs')
const oktaSecondaryEmail = require('./lib/okta/secondary-email')
const oktaSessionEnd = require('./lib/okta/secondary-email')
const laundry = require('./lib/laundry')
const laundryHall = require('./lib/laundry/hall')
const oktaLookup = require('./lib/okta/lookup')

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

exports.laundry = functions.https.onRequest(laundry)

exports.laundryHall = functions.https.onRequest(laundryHall)
