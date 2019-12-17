import base64 from 'base-64'
import fetch from 'node-fetch'
import checkHash from '../../common/check-hash'

const auth = base64.encode(
  `${process.env.CSUMB_FUNCTIONS_EVERBRIDGE_USER}:${
    process.env.CSUMB_FUNCTIONS_EVERBRIDGE_PASS
  }`
)

exports.handler = (event, context, callback) => {
  if (!checkHash(event)) {
    callback(null, {
      statusCode: 403,
      body: JSON.stringify({ error: true }),
    })
    return
  }
  const phone = event.queryStringParameters.phone.replace(/[^0-9,.]/g, '')
  fetch(
    `https://api.everbridge.net/rest/contacts/${
      process.env.CSUMB_FUNCTIONS_EVERBRIDGE_ORG
    }?externalIds=${event.queryStringParameters.user}`,
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
          process.env.CSUMB_FUNCTIONS_EVERBRIDGE_ORG
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
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({ error: false }),
          })
          return
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
  return true
}
