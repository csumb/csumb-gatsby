import LinkInspect from './link-inspect'
import styled from 'react-emotion'
import { colors } from './styles/theme'

const ButtonStyle = props => {
  if (typeof props.buttonType === 'undefined') {
    props.buttonType = 'default'
  }
  return `
  padding: 0.75rem;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: ${colors.white};
  }
  ${props.huge &&
    `
    font-size: 4rem;
    padding: 1rem;
  `}

  ${
    props.block
      ? `
    display: block;
    width: 100%;
  `
      : `
  
  display: inline-block;
  `
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

const LinkyButton = styled('button')`
  background: transparent;
  border: none;
  color: ${colors.primary.dark};
  text-decoration: underline;
  cursor: pointer;
  ${props => props.small && (
    `font-size: 80%;`
  )}
`

export { Button, ButtonLink, LinkyButton }
