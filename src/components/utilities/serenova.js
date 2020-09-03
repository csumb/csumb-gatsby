import { Component } from 'react'

class Serenova extends Component {
  componentDidMount() {
    if (typeof window === 'undefined' || typeof window.olark !== 'undefined') {
      return
    }
    const { siteId, greetingText, confirmationText } = this.props
    const headScript = document.createElement('script')
    headScript.setAttribute('id', 'serenova-react-snippet')
    headScript.setAttribute('type', 'text/javascript')
    headScript.setAttribute('async', true)
    headScript.setAttribute(
      'src',
      'https://us-east-1-prod-webchat.cxengage.net/load-chat.js'
    )
    headScript.setAttribute('data-cxengage-web-app-id', siteId)
    headScript.setAttribute(
      'data-cxengage-tenant-id',
      '1c1f87c2-ca12-4e85-a0ff-0ab7ae3251be'
    )
    headScript.setAttribute(
      'data-cxengage-prechat-capture-greeting-text',
      greetingText
    )
    headScript.setAttribute(
      'data-cxengage-prechat-capture-confirmation-text',
      confirmationText
    )
    document.head.appendChild(headScript)

    const bodyScript = document.createElement('script')
    bodyScript.setAttribute('id', 'serenova-react-body-snippet')
    bodyScript.setAttribute('type', 'text/javascript')
    bodyScript.setAttribute('async', true)
    bodyScript.setAttribute(
      'src',
      'https://us-east-1-prod-webchat.cxengage.net/init-chat.js'
    )
    document.body.appendChild(bodyScript)
  }

  render() {
    return null
  }
}

export default Serenova
