const feedbackTemplate = require('./template')
const sgMail = require('@sendgrid/mail')

setApiKey(process.env.CSUMB_FUNCTIONS_SENDGRID)

module.exports = (request, response) => {
  const feedbackEmail = request.query.feedbackEmail

  const feedbackHTML = feedbackTemplate(request.query)
  const msg = {
    to: feedbackEmail,
    from: 'webservices@csumb.edu',
    cc: 'webservices@csumb.edu',
    subject: `Page feedback on ${request.query.title}`,
    html: feedbackHTML,
  }
  sgMail.send(msg)
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
