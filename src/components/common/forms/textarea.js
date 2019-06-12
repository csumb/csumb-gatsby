import React from 'react'
import { FormGroup, focusStyle } from './styles'
import FormElement from './form-element'
import Label from './label'
import FormElement from './form-element'

const InputTextareaElement = styled.textarea`
  &:focus {
    ${focusStyle};
  }

  border-radius: 0;
  border: 1px solid ${colors.gray.deafult};
  padding: 0.3rem;
  width: ${props => (props.small ? '30%' : '100%')};
`

class InputTextarea extends FormElement {
  render() {
    const {
      inline,
      value,
      isRequired,
      hideLabel,
      label,
      forwardedRef,
    } = this.props

    return (
      <FormGroup inline={inline}>
        <Label
          labelId={this.htmlId}
          isRequired={isRequired}
          isHidden={hideLabel}
        >
          {label}
        </Label>
        <InputTextareaElement
          type="text"
          {...this.cleanProps(['value'])}
          ref={forwardedRef}
        >
          {value}
        </InputTextareaElement>
      </FormGroup>
    )
  }
}

export default InputTextarea
