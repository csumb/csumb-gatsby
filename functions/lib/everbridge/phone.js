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
  const phone = request.query.phone.replace(/[^0-9,.]/g, '')
  fetch(
    `https://api.everbridge.net/rest/contacts/${
      functions.config().everbridge.org
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
      let hasPhone = false
      user.contactAttributes = [
        { values: ['No'], orgAttrId: 333156318183509, name: 'optout' },
      ]

      user.paths.forEach((path, key) => {
        if (path.pathId === 241901148045324) {
          user.paths[key].value = phone
          hasPhone = true
        }
      })
      if (!hasPhone) {
        user.paths.push({
          waitTime: 0,
          pathId: 241901148045324,
          countryCode: 'US',
          value: phone,
          skipValidation: false,
        })
      }
      fetch(
        `https://api.everbridge.net/rest/contacts/${
          functions.config().everbridge.org
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
  return true
}
