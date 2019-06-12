import React from 'react'
import { InputTextElement, FormGroup } from './styles'
import FormElement from './form-element'
import Label from './label'
import FormElement from './form-element'

class InputText extends FormElement {
  render() {
    const {
      inline,
      defaultValue,
      isRequired,
      hideLabel,
      label,
      forwardedRef,
      noMargin,
    } = this.props
    return (
      <FormGroup inline={inline} noMargin={noMargin}>
        <Label
          labelId={this.htmlId}
          isRequired={isRequired}
          isHidden={hideLabel}
        >
          {label}
        </Label>
        <InputTextElement
          type="text"
          defaultValue={defaultValue}
          {...this.cleanProps()}
          id={this.htmlId}
          innerRef={forwardedRef}
        />
      </FormGroup>
    )
  }
}

export default InputText
