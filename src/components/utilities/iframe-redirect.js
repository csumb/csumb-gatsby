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
    if (top != self) {
        top.location = self.location;
    }`
    document.body.appendChild(script)
  }

  render() {
    return null
  }
}

export default IFrameRedirect
