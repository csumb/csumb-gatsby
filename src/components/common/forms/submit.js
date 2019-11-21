import React from 'react'
import styled from '@emotion/styled'
import { focusStyle } from './common'
import { colors } from '../../../style'

const SubmitButton = styled('input')`
&:focus {
  ${focusStyle};
}
padding: 1rem;
border: none;
border-radius: 0;
display: inline-block;
text-decoration: none;
cursor: pointer;
${props =>
  props.nomargin
    ? `
  `
    : `margin: 1.5rem 0;`}

color: ${colors.white} !important;
background: ${colors.buttons.default};
${props =>
  props.huge
    ? `
  font-size: 2rem;
  padding: 0.6rem;
`
    : ``};
${props =>
  props.small
    ? `
  padding: 0.35rem;
`
    : ``};
`

const Submit = props => <SubmitButton type="submit" {...props} />

export default Submit
