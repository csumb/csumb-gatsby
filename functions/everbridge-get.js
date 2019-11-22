'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var base64 = _interopDefault(require('base-64'));
var fetch = _interopDefault(require('node-fetch'));
var oktaClient = _interopDefault(require('@okta/okta-sdk-nodejs'));
var md5 = _interopDefault(require('md5'));

var client = new oktaClient.Client({
  orgUrl: 'csumb.okta.com',
  token: process.env.CSUMB_FUNCTIONS_OKTA_KEY,
});

const salt = process.env.CSUMB_FUNCTIONS_USER_SALT;

var checkHash = event => {
  const user =
    typeof event.queryStringParameters.user !== 'undefined'
      ? event.queryStringParameters.user
      : false;
  if (!user) {
    return false
  }
  return event.queryStringParameters.token === md5(user + salt)
};

exports.handler = (event, context, callback) => {
  if (!checkHash(event)) {
    callback(null, {
      statusCode: 403,
      body: JSON.stringify({ error: true }),
    });
    return
  }
  const auth = base64.encode(
    `${process.env.CSUMB_FUNCTIONS_EVERBRIDGE_USER}:${
      process.env.CSUMB_FUNCTIONS_EVERBRIDGE_PASS
    }`
  );
  client
    .getUser(event.queryStringParameters.user)
    .then(oktaUser => {
      const login = oktaUser.profile.login.split('@').shift();
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
            });
            return
          }
          const evUser = everbridgeUser.page.data[0];
          let optOut = false;
          if (typeof evUser.contactAttributes !== 'undefined') {
            evUser.contactAttributes.forEach(attribute => {
              if (
                attribute.name === 'optout' &&
                attribute.values.indexOf('Yes') > -1
              ) {
                optOut = true;
              }
            });
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
          });
        })
        .catch(error => {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({ error: true }),
          });
        });
      return true
    })
    .catch(error => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ error: true }),
      });
    });
};
