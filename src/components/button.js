import React from 'react'
import { css, cx } from 'emotion'
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

    const buttonTypes = {
      primary: {
        borderColor: 'blue',
        color: 'blue'
      }
    }

    let extraClass = {}
    if(typeof this.props.type !== 'undefined' && typeof buttonTypes[this.props.type] !== 'undefined') {
      extraClass = buttonTypes[this.props.type]
    }

    let to = this.props.to.replace('https://csumb.edu/', '')
    if(to.search(/http(s?):/) > -1) {
      return (
        <>
          <a href={to} className={cx(css(buttonClass), css(extraClass))}>{this.props.children}</a>
        </>
      )
    }
    return (
      <>
        <Link to={to} className={cx(css(buttonClass), css(extraClass))}>{this.props.children}</Link>
      </>
    )
  } 
}

export default Button