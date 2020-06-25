import { Component } from 'react'

class IFrameRedirect extends Component {
  componentDidMount() {
    if (
      typeof window === 'undefined' ||
      typeof window.__iFrameRedirect !== 'undefined'
    ) {
      return
    }
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('async', true)
    script.innerHTML = `
    console.log('top: ' + window.top.location + ' self: ' + window.self.location);
    if (window.top != window.self) {
        console.log(window.top.location + window.self.location)
        window.top.location = window.self.location;
    }`
    document.body.appendChild(script)
  }

  render() {
    return null
  }
}

export default IFrameRedirect
