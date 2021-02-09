import { Component } from 'react'

class GoogleSearch extends Component {
  componentDidMount() {
    if (
      typeof window === 'undefined' ||
      typeof window.__googleLoaded !== 'undefined'
    ) {
      return
    }
    window.__googleLoaded = true
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('async', true)
    script.setAttribute(
      'src',
      'https://cse.google.com/cse.js?cx=017752867313261290055:qexsyyoilns'
    )
    document.head.prepend(script)
  }

  render() {
    return null
  }
}

export default GoogleSearch
