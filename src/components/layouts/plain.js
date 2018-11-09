import React from 'react'
import '@reach/skip-nav/styles.css'

class Layout extends React.Component {
  render() {
    let pageTitle = []
    pageTitle.push(
      typeof this.props.pageTitle !== 'undefined' ? this.props.pageTitle : null
    )
    pageTitle.push('Cal State Monterey Bay')
    return <>{this.props.children}</>
  }
}

export default Layout
