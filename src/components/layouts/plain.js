import React, { Component } from 'react'

class Layout extends Component {
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
