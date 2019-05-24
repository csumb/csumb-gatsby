import { Component } from 'react'

class Pardot extends Component {
  componentDidMount() {
    if (typeof window === 'undefined' || typeof window.olark !== 'undefined') {
      return
    }
    window.paAId = '737633'
    window.piCId = '1883'
    window.piHostname = 'pi.pardot.com'
    const script = document.createElement('script')
    script.src = 'https://pi.pardot.com/pd.js'
    document.body.appendChild(script)
  }

  render() {
    return null
  }
}

export default Pardot
