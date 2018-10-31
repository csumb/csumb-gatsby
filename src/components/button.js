import React from 'react'
import LinkInspect from './link-inspect'
import styled from 'react-emotion'
import theme from './styles/theme'

const ButtonLink = styled(LinkInspect, {
  shouldForwardProp: 'buttonType',
})`
  padding: 1rem;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.white};
  }
  ${props =>
    props.buttonType === 'default'
      ? `
      color: ${theme.colors.primary.dark};
      border: 3px solid ${theme.colors.primary.dark};
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    `
      : ``} 
  ${props =>
    props.buttonType === 'primary'
      ? `
      color: ${theme.colors.primary.dark};
      border: 3px solid ${theme.colors.primary.dark};
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    `
      : ``} 
  ${props =>
    props.buttonType === 'highImpact'
      ? `
      color: ${theme.colors.indicators.high};
      border: 3px solid ${theme.colors.indicators.high};
      &:hover {
        background: ${theme.colors.indicators.high};
      }
    `
      : ``};
`

class Button extends React.Component {
  render() {
    const { buttonType } = this.props
    if (!this.props.to) {
      return null
    }
    return (
      <>
        <ButtonLink
          to={this.props.to}
          buttonType={buttonType ? buttonType : 'default'}
        >
          {this.props.children}
        </ButtonLink>
      </>
    )
  }
}

export default Button
