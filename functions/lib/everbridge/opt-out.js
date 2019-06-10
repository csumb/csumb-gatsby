const functions = require('firebase-functions')
const base64 = require('base-64')
const fetch = require('node-fetch')
const checkHash = require('../checkHash')

module.exports = (client, request, response) => {
  if (!checkHash(request)) {
    response.write(JSON.stringify({ error: true }))
    response.end()
    return
  }
  fetch(
    `https://api.everbridge.net/rest/contacts/${
      process.env.EVERBRIDGE_ORG
    }?externalIds=${request.query.user}`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  )
    .then(res => {
      return res.json()
    })
    .then(everbridgeUser => {
      let user = everbridgeUser.page.data[0]
      user.contactAttributes = [
        { values: ['Yes'], orgAttrId: 333156318183509, name: 'optout' },
      ]
      fetch(
        `https://api.everbridge.net/rest/contacts/${
          process.env.EVERBRIDGE_ORG
        }/${user.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      )
        .then(res => {
          return res.json()
        })
        .then(result => {
          response.send(JSON.stringify({ error: false }))
          return response.end()
        })
        .catch(error => {
          response.send(JSON.stringify({ error: true }))
          response.end()
        })
      return true
    })
    .catch(error => {
      response.send(JSON.stringify({ error: true }))
      return response.end()
    })
}
