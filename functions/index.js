const functions = require('firebase-functions')
const oktaClient = require('@okta/okta-sdk-nodejs')
const oktaSecondaryEmail = require('./lib/okta/secondary-email')
const oktaSessionEnd = require('./lib/okta/secondary-email')
const oktaProfile = require('./lib/okta/profile')
const oktaLookup = require('./lib/okta/lookup')
const everbridgeGet = require('./lib/everbridge/get')
const everbridgePhone = require('./lib/everbridge/phone')
const everbridgeOptOut = require('./lib/everbridge/opt-out')
const laundry = require('./lib/laundry')
const laundryHall = require('./lib/laundry/hall')
const profileGet = require('./lib/profile/get')
const feedback = require('./lib/feedback')

const client = new oktaClient.Client({
  orgUrl: `https://${functions.config().okta.domain}`,
  token: functions.config().okta.key,
})

const setCors = response => {
  response.set({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  })
}

exports.oktaSecondaryEmail = functions.https.onRequest((request, response) => {
  setCors(response)
  oktaSecondaryEmail(client, request, response)
})

exports.oktaSessionEnd = functions.https.onRequest((request, response) => {
  setCors(response)
  oktaSessionEnd(client, request, response)
})

exports.oktaLookup = functions.https.onRequest((request, response) => {
  setCors(response)
  oktaLookup(client, request, response)
})

exports.oktaProfile = functions.https.onRequest((request, response) => {
  setCors(response)
  oktaProfile(client, request, response)
})

exports.everbridgeGet = functions.https.onRequest((request, response) => {
  setCors(response)
  everbridgeGet(client, request, response)
})

exports.everbridgePhone = functions.https.onRequest((request, response) => {
  setCors(response)
  everbridgePhone(client, request, response)
})

exports.everbridgeOptOut = functions.https.onRequest((request, response) => {
  setCors(response)
  everbridgeOptOut(client, request, response)
})

exports.profileGet = functions.https.onRequest((request, response) => {
  setCors(response)
  profileGet(client, request, response)
})

exports.laundry = functions.https.onRequest(laundry)

exports.laundryHall = functions.https.onRequest(laundryHall)

exports.feedback = functions.https.onRequest(feedback)
