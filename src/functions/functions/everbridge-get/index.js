import base64 from 'base-64'
import fetch from 'node-fetch'
import client from '../../common/okta-client'
import checkHash from '../../common/check-hash'

exports.handler = (event, context, callback) => {
  if (!checkHash(event)) {
    callback(null, {
      statusCode: 403,
      body: JSON.stringify({ error: true }),
    })
    return
  }
  const auth = base64.encode(
    `${process.env.CSUMB_FUNCTIONS_EVERBRIDGE_USER}:${
      process.env.CSUMB_FUNCTIONS_EVERBRIDGE_PASS
    }`
  )
  client
    .getUser(event.queryStringParameters.user)
    .then(oktaUser => {
      const login = oktaUser.profile.login.split('@').shift()
      fetch(
        `https://api.everbridge.net/rest/contacts/${
          process.env.CSUMB_FUNCTIONS_EVERBRIDGE_ORG
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
            callback(null, {
              statusCode: 200,
              body: JSON.stringify({ error: true }),
            })
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

          callback(null, {
            statusCode: 200,
            body: JSON.stringify({
              error: false,
              user: {
                paths: evUser.paths,
                id: evUser.id,
                optOut: optOut,
              },
            }),
          })
        })
        .catch(error => {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({ error: true }),
          })
        })
      return true
    })
    .catch(error => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ error: true }),
      })
    })
}
