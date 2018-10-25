import React from 'react'
import Link from 'gatsby-link'

class LinkInspect extends React.Component {
  render() {
    if (!this.props.to) {
      return null
    }
    let to = this.props.to.replace('https://csumb.edu/', '')
    if (to.search(/http(s?):/) > -1) {
      return (
        <>
          <a href={to} {...this.props}>
            {this.props.children}
          </a>
        </>
      )
    }
    return (
      <>
        <Link to={to} {...this.props}>
          {this.props.children}
        </Link>
      </>
    )
  }
}

export default LinkInspect
