import { colors } from '../../../style'
import styled from '@emotion/styled'

const focusStyle = `
transition:all 100ms;
  outline: 0.25rem solid ${colors.primary.default}
`

const FormGroup = styled('div')`
  ${props => (props.noMargin ? `` : `margin-bottom: 0.5rem;`)}
  ${props => (props.inline ? `display: inline-block;` : ``)};
`

const InputTextElement = styled('input')`
  &:focus {
    ${focusStyle};
  }
  border-radius: 0;
  border: 1px solid ${colors.gray.deafult};
  padding: 0.3rem;
  width: ${props => (props.small ? '30%' : '100%')};
  ${props =>
    props.huge
      ? `
    padding: 0.6rem;
    font-size: 2rem;
  `
      : ``};
`

export { focusStyle, FormGroup, InputTextElement }
