const md5 = require('md5')
const github = require('octonode')
const ghClient = github.client(process.env.GITHUB_TOKEN)
const repo = ghClient.repo('csumb/website-data')

const salt = process.env.CSUMB_FUNCTIONS_USER_SALT

const checkHash = event => {
  const user =
    typeof event.queryStringParameters.user !== 'undefined'
      ? event.queryStringParameters.user
      : false
  if (!user) {
    return false
  }
  return event.queryStringParameters.token === md5(user + salt)
}

exports.handler = (event, context, callback) => {
  if (!checkHash(event)) {
    callback(null, {
      statusCode: 403,
      body: JSON.stringify({ error: true }),
    })
    return
  }
  client
    .getUser(event.queryStringParameters.user)
    .then(oktaUser => {
      const login = oktaUser.profile.login.toLowerCase().split('@')
      repo.contents(`/directory/${login[0]}.json`, (error, data) => {
        if (error) {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({ error: true }),
          })
          return
        }
        const content = Buffer.from(data.content, 'base64')
        callback(null, {
          statusCode: 200,
          body: content.toString(),
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
