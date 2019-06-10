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
  const auth = base64.encode(
    `${functions.config().everbridge.user}:${
      functions.config().everbridge.pass
    }`
  )
  client
    .getUser(request.query.user)
    .then(oktaUser => {
      const login = oktaUser.profile.login.split('@').shift()
      fetch(
        `https://api.everbridge.net/rest/contacts/${
          functions.config().everbridge.org
        }?externalIds=${login}`,
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
          if (typeof everbridgeUser.page.data[0] === 'undefined') {
            response.send(JSON.stringify({ error: true }))
            response.end()
            return
          }
          const evUser = everbridgeUser.page.data[0]
          let optOut = false
          if (typeof evUser.contactAttributes !== 'undefined') {
            evUser.contactAttributes.forEach(attribute => {
              if (
                attribute.name === 'optout' &&
                attribute.values.indexOf('Yes') > -1
              ) {
                optOut = true
              }
            })
          }
          return response.send(
            JSON.stringify({
              error: false,
              user: {
                paths: evUser.paths,
                id: evUser.id,
                optOut: optOut,
              },
            })
          )
        })
        .catch(error => {
          response.send(JSON.stringify({ error: true }))
          return response.end()
        })
      return true
    })
    .catch(error => {
      response.send(JSON.stringify({ error: true }))
      return response.end()
    })
}
