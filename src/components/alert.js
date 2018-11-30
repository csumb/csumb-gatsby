import React from 'react'
import styled from 'react-emotion'
import Alert from '@reach/alert'
import { css } from 'emotion'
import { colors } from 'components/styles/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import color from 'color'
import VisuallyHidden from '@reach/visually-hidden'
import {
  faCheckCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import { Flex, Box } from '@rebass/grid/emotion'
import bp from './styles/breakpoints'

const baseStyle = css`
  display: block;
  padding: 0.5rem;
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

const AlertInfoElement = styled(Alert)`
  ${baseStyle};
  background: ${color(colors.indicators.low)
    .lighten(1.5)
    .hex()};

  border-left: 8px solid ${colors.indicators.low};
`

const AlertInfo = props => (
  <AlertInfoElement {...props}>
    <VisuallyHidden>For your information</VisuallyHidden>
    <AlertContent icon={faCheckCircle}>{props.children}</AlertContent>
  </AlertInfoElement>
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

export { AlertDanger, AlertInfo, AlertWarning, AlertEmpty }
