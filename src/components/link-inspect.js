import React from 'react'
import Link from 'gatsby-link'

class LinkInspect extends React.Component {
  render() {
    if (!this.props.to) {
      return null
    }
    let to = this.props.to.replace('https://csumb.edu/', '')
    const { buttonType, ...props } = this.props
    if (to.search(/http(s?):/) > -1) {
      return (
        <>
          <a href={to} {...props}>
            {this.props.children}
          </a>
        </>
      )
    }
    return (
      <>
        <Link to={to} {...props}>
          {this.props.children}
        </Link>
      </>
    )
  }
}

export default LinkInspect
