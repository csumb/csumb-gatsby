const functions = require('firebase-functions')
const fetch = require('node-fetch')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.itAlerts = functions.https.onRequest((req, res) => {
  fetch('http://csumbalerts.tumblr.com/api/read/json?callback=csumbAlerts')
    .then(response => {
      return response.json()
    })
    .then(response => {
      response.send(JSON.stringify(response))
      response.end()
    })
})
