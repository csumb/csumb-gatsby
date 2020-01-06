import feedbackTemplate from './template.js'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.CSUMB_FUNCTIONS_SENDGRID)

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
  response.send(JSON.stringify({ success: true, email: feedbackEmail }))
  response.end()
}
