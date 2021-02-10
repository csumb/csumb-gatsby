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
    script.setAttribute(
      'src',
      'https://cse.google.com/cse.js?cx=017752867313261290055:qexsyyoilns'
    )
    document.body.prepend(script)
  }

  render() {
    return null
  }
}

export default GoogleSearch
