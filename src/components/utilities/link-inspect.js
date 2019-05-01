import React from 'react'
import Link from 'gatsby-link'

class LinkInspect extends React.Component {
  render() {
    let { to, children, buttonType, ...props } = this.props
    if (!to) {
      return null
    }
    to = to.replace('https://csumb.edu/', '')
    if (to.search(/http(s?):/) > -1 || to.search('mailto:') > -1) {
      return (
        <>
          <a href={to} {...props}>
            {children}
          </a>
        </>
      )
    }
    if (to.substr(0, 1) !== '/') {
      to = `/${to}`
    }
    return (
      <>
        <Link to={to} {...props}>
          {children}
        </Link>
      </>
    )
  }
}

export default LinkInspect
