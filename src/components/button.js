import React from 'react'
import LinkInspect from './link-inspect'
import styled from 'react-emotion'
import theme from './styles/theme'

const ButtonLink = styled(LinkInspect)`
  padding: 1rem;
  display: inline-block;
  text-decoration: none;
  ${props =>
    props.buttonType === 'default'
      ? `
      color: ${theme.colors.black};
      border: 3px solid ${theme.colors.black};
    `
      : ``} 
  ${props =>
    props.buttonType === 'primary'
      ? `
      color: ${theme.colors.primary.dark};
      border: 3px solid ${theme.colors.primary.dark};
    `
      : ``} 
  ${props =>
    props.buttonType === 'highImpact'
      ? `
      color: ${theme.colors.indicators.high};
      border: 3px solid ${theme.colors.indicators.high};
      &:hover {
        background: ${theme.colors.indicators.high};
        color: ${theme.colors.white};
      }
    `
      : ``};
`

class Button extends React.Component {
  render() {
    if (!this.props.to) {
      return null
    }
    return (
      <>
        <ButtonLink
          to={this.props.to}
          buttonType={this.props.buttonType ? this.props.buttonType : 'default'}
        >
          {this.props.children}
        </ButtonLink>
      </>
    )
  }
}

export default Button
