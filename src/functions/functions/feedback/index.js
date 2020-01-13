const feedbackTemplate = require('./template.js')
const sgMail = require('@sendgrid/mail')

setApiKey(process.env.CSUMB_FUNCTIONS_SENDGRID)

export default (event, response) => {
  const feedbackEmail = event.queryStringParameters.feedbackEmail

  const feedbackHTML = feedbackTemplate(event.queryStringParameters)
  const msg = {
    to: feedbackEmail,
    from: 'webservices@csumb.edu',
    cc: 'webservices@csumb.edu',
    subject: `Page feedback on ${event.queryStringParameters.title}`,
    html: feedbackHTML,
  }
  sgMail
    .send(msg)
    .then(() => {
      response.send(JSON.stringify({ success: true, email: feedbackEmail }))
    })
    .catch(error => {
      //Log friendly error
      console.error(error.toString())

      //Extract error msg
      const { message, code, response } = error

      //Extract response msg
      const { headers, body } = response
    })
}
response.end()
