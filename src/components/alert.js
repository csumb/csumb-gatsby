import React from 'react'
import styled from 'react-emotion'
import Alert from '@reach/alert'
import { css } from 'emotion'
import { colors } from 'components/styles/theme'

const baseStyle = css`
  display: block;
  padding: 0.25rem;
  p {
    margin-bottom: 0;
  }
`

const AlertDanger = styled(Alert)`
  ${baseStyle};
  color: ${colors.white};
  background: ${colors.indicators.high};
`

const AlertWarning = styled(Alert)`
  ${baseStyle};
  color: ${colors.white};
  background: ${colors.indicators.medium};
`

const AlertInfo = styled(Alert)`
  ${baseStyle};
  color: ${colors.white};
  background: ${colors.indicators.low};
`

export { AlertDanger, AlertInfo, AlertWarning }
