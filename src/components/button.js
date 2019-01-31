import LinkInspect from './link-inspect'
import styled from '@emotion/styled'
import { colors } from './styles/theme'

const ButtonStyle = props => {
  if (typeof props.buttonType === 'undefined') {
    props.buttonType = 'default'
  }
  return `
  padding: 0.75rem;
  text-decoration: none;
  cursor: pointer;
  border: none;
  color: ${colors.white} !important;
  background: ${colors.buttons.default};
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
    ${props.extraMargin &&
    `
      margin: 1rem 0;
    `}
  ${
    props.buttonType === 'default'
      ? `
      color: ${colors.white};
      background: ${colors.buttons.default};
      &:hover {
        
      }
    `
      : ``
    } 
  ${
    props.buttonType === 'primary'
      ? `
      color: ${colors.white};
      background: ${colors.buttons.default};
      &:hover {
        
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

const ButtonLink = styled(LinkInspect)`
  ${props => ButtonStyle(props)};
`

const Button = styled('button')`
  ${props => ButtonStyle(props)};
`

const LinkyButton = styled('button')`
  background: transparent;
  border: none;
  color: ${colors.primary.dark};
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  ${props => props.small && `font-size: 80%;`}
`

export { Button, ButtonLink, LinkyButton }
