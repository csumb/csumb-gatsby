const functions = require('firebase-functions')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(functions.config().sendgrid.key)

module.exports = (request, response) => {
  const design =
    request.query.design === 'title-department'
      ? 'Include title - 3 line'
      : 'Do not include title - 2 line'
  const body = `<h2>CSUMB name badge order</h2>
    <strong>Name:</strong> ${request.query.firstName} ${
    request.query.lastName
  }<br/>
    <strong>Title:</strong> ${request.query.title}<br/>
    <strong>Department:</strong> ${request.query.department}<br/>
    <strong>Email:</strong> ${request.query.email}<br/>
    <strong>Name tag type:</strong> ${design}<br/>
    <strong>Person with department pro card:</strong> ${
      request.query.procardemail
    }<br/>
    Your request is on its way to CSUMB\'s official vendor. 
    They will send you a proof to approve; if you have any issues with name, 
    title or department, please contact University Personnel at 
    university_personnel@csumb.edu or 582-3389.
`

  const msg = {
    to: request.query.email,
    from: 'donotreply@csumb.edu',
    cc: functions.config().namebadge.emails,
    subject: 'CSUMB Name Badge Order',
    html: body,
  }
  sgMail.send(msg)
  response.send(JSON.stringify({ success: true }))
  response.end()
}
