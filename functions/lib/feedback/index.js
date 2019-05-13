const cryptex = require('node-cryptex')
const feedbackTemplate = require('./feedback-template')
const functions = require('firebase-functions')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(functions.config().sendgrid.key)

module.exports = (request, response) => {
  const iv = new Buffer(16)
  const feedbackEmail = cryptex.decrypt(
    request.query.feedbackEmail,
    functions.config().feedback.secret,
    iv
  )

  const feedbackHTML = feedbackTemplate(request.query)
  const msg = {
    to: feedbackEmail,
    from: 'webservices@csumb.edu',
    subject: `Page feedback on ${request.query.title}`,
    html: feedbackHTML,
  }
  sgMail.send(msg)
  response.send(JSON.stringify({ success: true }))
  response.end()
}
