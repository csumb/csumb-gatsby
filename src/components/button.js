import LinkInspect from './link-inspect'
import styled from 'react-emotion'
import theme from './styles/theme'

const ButtonStyle = props => {
  if (typeof props.buttonType === 'undefined') {
    props.buttonType = 'default'
  }
  return `
  padding: 1rem;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.white};
  }
  ${
    props.buttonType === 'default'
      ? `
      color: ${theme.colors.primary.dark};
      border: 3px solid ${theme.colors.primary.dark};
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    `
      : ``
  } 
  ${
    props.buttonType === 'primary'
      ? `
      color: ${theme.colors.primary.dark};
      border: 3px solid ${theme.colors.primary.dark};
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    `
      : ``
  } 
  ${
    props.buttonType === 'highImpact'
      ? `
      color: ${theme.colors.indicators.high};
      border: 3px solid ${theme.colors.indicators.high};
      &:hover {
        background: ${theme.colors.indicators.high};
      }
    `
      : ``
  };
`
}

const ButtonLink = styled(LinkInspect, {
  shouldForwardProp: 'buttonType',
})`
  ${props => ButtonStyle(props)};
`

const Button = styled('button', {
  shouldForwardProp: 'buttonType',
})`
  ${props => ButtonStyle(props)};
`

export { Button, ButtonLink }
