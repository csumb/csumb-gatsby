import feedbackTemplate from './template.js'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.CSUMB_FUNCTIONS_SENDGRID)

exports.handler = (event, context, callback) => {
  const feedbackEmail = event.queryStringParameters.feedbackEmail

  const feedbackHTML = feedbackTemplate(event.queryStringParameters)
  const msg = {
    to: feedbackEmail,
    from: 'webservices@csumb.edu',
    cc: 'webservices@csumb.edu',
    subject: `Page feedback on ${event.queryStringParameters.title}`,
    html: feedbackHTML,
  }
  sgMail.send(msg)
  response.send(JSON.stringify({ success: true, email: feedbackEmail }))
  response.end()
}
