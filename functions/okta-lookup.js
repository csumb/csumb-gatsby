'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var oktaClient = _interopDefault(require('@okta/okta-sdk-nodejs'));

var client = new oktaClient.Client({
  orgUrl: 'csumb.okta.com',
  token: process.env.CSUMB_FUNCTIONS_OKTA_KEY,
});

exports.handler = (event, context, callback) => {
  const { firstName, lastName, dob } = event.queryStringParameters;
  const filter = `profile.firstName eq "${firstName}" and profile.lastName eq "${lastName}"`;
  console.log(filter);
  let foundUser = false;
  client
    .listUsers({
      filter: filter,
    })
    .each(user => {
      if (user.profile.birthdate === dob) {
        foundUser = true;
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ id: user.profile.login.split('@').shift() }),
        });
        return
      }
    })
    .then(() => {
      if (!foundUser) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ error: true }),
        });
      }
      return foundUser
    })
    .catch(error => {
      console.log(error);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ error: true }),
      });
    });
};
