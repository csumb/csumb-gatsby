import LinkInspect from '../utilities/link-inspect'
import styled from '@emotion/styled'
import { colors } from '../../style'

const ButtonStyle = props => {
  if (typeof props.buttonType === 'undefined') {
    props.buttonType = 'default'
  }
  return `
  border-radius: 3px;
  display: inline-block;
  padding: .35em 0.65em;
  font-size: .9em;
  text-decoration: none;
  cursor: pointer;
  border: none;
  color: ${colors.white} !important;
  background: ${colors.primary.default};
  &:hover {
    background: ${colors.primary.dark};
  }
  ${props.disabled &&
    `
    cursor: not-allowed;
  `}
  ${props.huge &&
    `
    font-size: 3rem;
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

const ButtonLinkAnchor = styled.a`
  ${props => ButtonStyle(props)};
`

const Button = styled.button`
  ${props => ButtonStyle(props)};
`

const LinkyButton = styled.button`
  background: transparent;
  border: none;
  color: ${colors.primary.dark};
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  text-align: left;
  ${props => props.small && `font-size: 80%;`}
`

export { Button, ButtonLink, LinkyButton, ButtonLinkAnchor }
