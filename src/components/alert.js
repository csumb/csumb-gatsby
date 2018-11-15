import React from 'react'
import styled from 'react-emotion'
import Alert from '@reach/alert'
import { css } from 'emotion'
import { colors } from 'components/styles/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import color from 'color'
import {
  faCheckCircle,
  faExclamationTriangle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'
import { Flex, Box } from '@rebass/grid/emotion'

const baseStyle = css`
  display: block;
  padding: 0.5rem;
  p {
    margin-bottom: 0;
  }
`

const AlertIcon = styled(FontAwesomeIcon)`
  font-size: 2.8rem;
`

const AlertContent = ({ icon, children }) => (
  <Flex flexWrap="wrap">
    <Box width={[1, 1 / 6, 1 / 10]} px={2}>
      <AlertIcon icon={icon} />
    </Box>
    <Box width={[1, 5 / 6, 9 / 10]} px={2}>
      {children}
    </Box>
  </Flex>
)

const AlertDangerElement = styled(Alert)`
  ${baseStyle};
  background: ${color(colors.indicators.high)
    .lighten(0.8)
    .hex()};
  border-left: 4px solid ${colors.indicators.high};
`

const AlertDanger = props => (
  <AlertDangerElement {...props}>
    <AlertContent icon={faExclamationCircle}>{props.children}</AlertContent>
  </AlertDangerElement>
)

const AlertWarningElement = styled(Alert)`
  ${baseStyle};
  background: ${color(colors.indicators.medium)
    .lighten(0.95)
    .hex()};
  border-left: 4px solid ${colors.indicators.medium};
`
const AlertWarning = props => (
  <AlertWarningElement {...props}>
    <AlertContent icon={faExclamationTriangle}>{props.children}</AlertContent>
  </AlertWarningElement>
)

const AlertInfoElement = styled(Alert)`
  ${baseStyle};
  background: ${color(colors.indicators.low)
    .lighten(0.98)
    .hex()};
  border-left: 4px solid ${colors.indicators.low};
`

const AlertInfo = props => (
  <AlertInfoElement {...props}>
    <AlertContent icon={faCheckCircle}>{props.children}</AlertContent>
  </AlertInfoElement>
)

export { AlertDanger, AlertInfo, AlertWarning }
