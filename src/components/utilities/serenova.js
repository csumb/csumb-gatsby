import { Component } from 'react'

const serenovaValues = {
  admissions: {
    site: 'admissions',
    code: '5f3533b7b95b53000cd78fc2',
    greetingText: `Hi, thank you for reaching out the office of Admissions. To start off we'd like to know a little bit more about you`,
    confirmationText: `Thanks for your email`,
  },
  it: {
    site: 'it',
    code: '5f3533d47cf37f000ee14e41',
    greetingText: `Hi, welcome to the CSUMB Technology Support Services chat. We are here to help you with your technology questions. To start off we'd like to know a little bit more about you`,
    confirmationText: `Thanks for your name `,
  },
  csc: {
    site: 'csc',
    code: '5f3533e9cdb903000d95fd43',
    greetingText: `Hello, You have reached the Campus Service Center`,
    confirmationText: `Thanks for your name`,
  },
  cost: {
    site: 'cost',
    code: '5f3533e9cdb903000d95fd43',
    greetingText: `Hello, You have reached the Campus Service Center`,
    confirmationText: `Thanks for your name`,
  },
  dashboard: {
    site: 'dashboard',
    code: '5f3533e9cdb903000d95fd43',
    greetingText: `Hello, You have reached the Campus Service Center`,
    confirmationText: `Thanks for your name`,
  },
}

class Serenova extends Component {
  componentDidMount() {
    if (
      typeof window === 'undefined' ||
      typeof window.serenova !== 'undefined'
    ) {
      return
    }
    const { site } = this.props
    console.log(site)
    const serenovaProps = serenovaValues[site]
    console.log(serenovaProps)

    const headScript = document.createElement('script')
    headScript.setAttribute('id', 'serenova-react-snippet')
    headScript.setAttribute('type', 'text/javascript')
    headScript.setAttribute('async', true)
    headScript.setAttribute(
      'src',
      'https://us-east-1-prod-webchat.cxengage.net/load-chat.js'
    )
    headScript.setAttribute('data-cxengage-web-app-id', serenovaProps.code)
    headScript.setAttribute(
      'data-cxengage-tenant-id',
      '1c1f87c2-ca12-4e85-a0ff-0ab7ae3251be'
    )
    headScript.setAttribute(
      'data-cxengage-prechat-capture-greeting-text',
      serenovaProps.greetingText
    )
    headScript.setAttribute(
      'data-cxengage-prechat-capture-confirmation-text',
      serenovaProps.confirmationText
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
