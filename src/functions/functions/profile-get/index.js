import github from 'octonode'
import checkHash from '../../common/check-hash'
import client from '../../common/okta-client'

const ghClient = github.client(process.env.GITHUB_TOKEN)
const repo = ghClient.repo('csumb/website-data')

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
