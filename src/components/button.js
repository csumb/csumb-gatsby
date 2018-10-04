import React from 'react'
import { css } from 'emotion'
import Link from 'gatsby-link'

class Button extends React.Component {
  render() {
    if(!this.props.to) {
      return null
    }
    const buttonClass = {
      border: '3px solid #000',
      color: '#000',
      padding: '1rem',
      display: 'inline-block',
      textDecoration: 'none'
    }

    let to = this.props.to.replace('https://csumb.edu/', '')
    if(to.search(/http(s?):/) > -1) {
      return (
        <>
          <a href={to} className={css(buttonClass)}>{this.props.children}</a>
        </>
      )
    }
    return (
      <>
        <Link to={to} className={css(buttonClass)}>{this.props.children}</Link>
      </>
    )
  } 
}

export default Button