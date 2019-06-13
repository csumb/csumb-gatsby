import React from 'react'
import { InputTextElement, FormGroup } from './common'
import FormElement from './form-element'
import Label from './label'

class InputPassword extends FormElement {
  render() {
    const {
      inline,
      defaultValue,
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
        <InputTextElement
          type="password"
          defaultValue={defaultValue}
          {...this.cleanProps()}
          id={this.htmlId}
          innerRef={forwardedRef}
        />
      </FormGroup>
    )
  }
}

export default InputPassword
