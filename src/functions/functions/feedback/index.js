import feedbackTemplate from './template.js'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.CSUMB_FUNCTIONS_SENDGRID)

exports.handler = (event, response) => {
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
      console.log(response.toString())
      response.send(JSON.stringify({ success: true, email: feedbackEmail }))
      response.end()
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
