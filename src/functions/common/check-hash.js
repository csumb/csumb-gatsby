import md5 from 'md5'

const salt = process.env.CSUMB_FUNCTIONS_USER_SALT

export default event => {
  const user =
    typeof event.queryStringParameters.user !== 'undefined'
      ? event.queryStringParameters.user
      : false
  if (!user) {
    return false
  }
  return event.queryStringParameters.token === md5(user + salt)
}
