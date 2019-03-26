const functions = require('firebase-functions')
const fetch = require('node-fetch')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.itAlerts = functions.https.onRequest((req, response) => {
  fetch('http://csumbalerts.tumblr.com/api/read/json?callback=csumbAlerts')
    .then(result => {
      return result.text()
    })
    .then(result => {
      response.send(result)
      response.end()
    })
})
