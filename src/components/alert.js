import React from 'react'
import styled from '@emotion/styled'
import Alert from '@reach/alert'
import { colors } from 'style/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import color from 'color'
import VisuallyHidden from 'components/visually-hidden'
import {
  faCheckCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import { Flex, Box } from '@rebass/grid/emotion'
import bp from './styles/breakpoints'

const baseStyle = `
  display: block;
  padding: 0.5rem;
  margin: 1rem 0;
  p {
    margin-bottom: 0;
  }
`

const AlertIcon = styled(FontAwesomeIcon)`
  font-size: 2.8rem;
  margin-top: 0.5rem;
`

const AlertIconBox = styled(Box)`
  ${bp({
    display: ['none', 'block', 'block', 'block'],
  })};
`

const AlertContent = ({ icon, children }) => (
  <Flex flexWrap="wrap">
    <AlertIconBox width={[0, 1 / 6, 1 / 10]} px={2}>
      <AlertIcon icon={icon} />
    </AlertIconBox>
    <Box width={[1, 5 / 6, 9 / 10]} px={4}>
      {children}
    </Box>
  </Flex>
)

const AlertDangerElement = styled(Alert)`
  ${baseStyle};
  background: ${color(colors.indicators.high)
    .lighten(0.8)
    .hex()};
  border-left: 8px solid ${colors.indicators.high};
`

const AlertDanger = props => (
  <AlertDangerElement {...props}>
    <VisuallyHidden>Danger</VisuallyHidden>
    <AlertContent icon={faExclamationCircle}>{props.children}</AlertContent>
  </AlertDangerElement>
)

const AlertWarningElement = styled(Alert)`
  ${baseStyle};
  background: ${color(colors.indicators.medium)
    .lighten(0.95)
    .hex()};
  border-left: 8px solid ${colors.indicators.medium};
`
const AlertWarning = props => (
  <AlertWarningElement {...props}>
    <VisuallyHidden>Warning</VisuallyHidden>
    <AlertContent icon={faExclamationTriangle}>{props.children}</AlertContent>
  </AlertWarningElement>
)

const AlertSuccessElement = styled(Alert)`
  ${baseStyle};
  background: ${color(colors.indicators.low)
    .lighten(1.5)
    .hex()};

  border-left: 8px solid ${colors.indicators.low};
`

const AlertSuccess = props => (
  <AlertSuccessElement {...props}>
    <VisuallyHidden>For your information</VisuallyHidden>
    <AlertContent icon={faCheckCircle}>{props.children}</AlertContent>
  </AlertSuccessElement>
)

const AlertEmptyElement = styled(Alert)`
  ${baseStyle};
  border: 1px solid ${colors.muted.bright};
`

const AlertEmpty = props => (
  <AlertEmptyElement {...props}>
    <VisuallyHidden>For your information</VisuallyHidden>
    <AlertContent icon={faTimesCircle}>{props.children}</AlertContent>
  </AlertEmptyElement>
)

const AlertFyiElement = styled(Alert)`
  ${baseStyle};
  border: 1px solid ${colors.muted.bright};
  font-weight: bold;
`

const AlertFyi = props => (
  <AlertFyiElement {...props}>{props.children}</AlertFyiElement>
)

export { AlertDanger, AlertSuccess, AlertWarning, AlertEmpty, AlertFyi }
