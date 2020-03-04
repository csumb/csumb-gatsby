import React from 'react'
import styled from '@emotion/styled'
import Alert from '@reach/alert'
import { colors, bp } from '../../style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import color from 'color'
import VisuallyHidden from '../utilities/visually-hidden'
import {
  faCheckCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import { Flex, Box } from './grid'

const baseStyle = `
  display: block;
  padding: 0.75rem;
  margin: 1rem 0;
  p {
    margin-bottom: 0;
  }
`

const AlertIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  margin: 0;
  svg {
    padding: 0;
    height: 75%;
  }
  path {
    color: #c83618;
`

const AlertIconBox = styled(Box)`
  ${bp({
    display: ['none', 'flex', 'flex', 'flex'],
  })};
`

const AlertDangerElement = styled(Alert)`
  ${baseStyle};
  background: ${color(colors.indicators.high)
    .lighten(0.8)
    .hex()};
  border-left: 8px solid #c83618;
  }
`

const AlertWarningElement = styled(Alert)`
  ${baseStyle};
  background: ${color(colors.indicators.medium)
    .lighten(0.95)
    .hex()};
  border-left: 8px solid ${colors.indicators.medium};
`

const AlertSuccessElement = styled(Alert)`
  ${baseStyle};
  background: ${color(colors.indicators.low)
    .lighten(1.5)
    .hex()};

  border-left: 8px solid ${colors.indicators.low};
`

const AlertEmptyElement = styled(Alert)`
  ${baseStyle};
  border: 1px solid ${colors.muted.bright};
`

const AlertFyiElement = styled(Alert)`
  ${baseStyle};
  border: 1px solid ${colors.muted.bright};
  font-weight: bold;
`

const AlertTopElement = styled(Alert)`
  ${baseStyle};
  margin: 0;
  background: ${colors.primary.darkest};
  text-align: center;
  a {
    color: ${colors.white} !important;
  }
`

const AlertContent = ({ icon, children }) => (
  <Flex>
    <AlertIconBox width={[0, 1 / 6, 0.75 / 10]} pr={6}>
      <AlertIcon icon={icon} />
    </AlertIconBox>
    <Box style={{ display: 'flex' }} width={[1, 5 / 6, 9.25 / 10]}>
      {children}
    </Box>
  </Flex>
)

const AlertDanger = props => (
  <AlertDangerElement {...props}>
    <VisuallyHidden>Danger</VisuallyHidden>
    <AlertContent icon={faExclamationCircle}>{props.children}</AlertContent>
  </AlertDangerElement>
)

const AlertWarning = props => (
  <AlertWarningElement {...props}>
    <VisuallyHidden>Warning</VisuallyHidden>
    <AlertContent icon={faExclamationTriangle}>{props.children}</AlertContent>
  </AlertWarningElement>
)

const AlertSuccess = props => (
  <AlertSuccessElement {...props}>
    <VisuallyHidden>For your information</VisuallyHidden>
    <AlertContent icon={faCheckCircle}>{props.children}</AlertContent>
  </AlertSuccessElement>
)

const AlertEmpty = props => (
  <AlertEmptyElement {...props}>
    <VisuallyHidden>For your information</VisuallyHidden>
    <AlertContent icon={faTimesCircle}>{props.children}</AlertContent>
  </AlertEmptyElement>
)

const AlertFyi = props => (
  <AlertFyiElement {...props}>{props.children}</AlertFyiElement>
)

const AlertTop = props => (
  <AlertTopElement {...props}>{props.children}</AlertTopElement>
)

export {
  AlertDanger,
  AlertSuccess,
  AlertWarning,
  AlertEmpty,
  AlertFyi,
  AlertTop,
}
