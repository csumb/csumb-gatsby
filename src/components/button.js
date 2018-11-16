import LinkInspect from './link-inspect'
import styled from 'react-emotion'
import { colors } from './styles/theme'

const ButtonStyle = props => {
  if (typeof props.buttonType === 'undefined') {
    props.buttonType = 'default'
  }
  return `
  padding: 0.75rem;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: ${colors.white};
  }
  ${
    props.buttonType === 'default'
      ? `
      color: ${colors.primary.dark};
      border: 3px solid ${colors.primary.dark};
      &:hover {
        background: ${colors.primary.dark};
      }
    `
      : ``
  } 
  ${
    props.buttonType === 'primary'
      ? `
      color: ${colors.primary.dark};
      border: 3px solid ${colors.primary.dark};
      &:hover {
        background: ${colors.primary.dark};
      }
    `
      : ``
  } 
  ${
    props.buttonType === 'highImpact'
      ? `
      color: ${colors.indicators.high};
      border: 3px solid ${colors.indicators.high};
      &:hover {
        background: ${colors.indicators.high};
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
