import React from 'react'
import { InputTextElement, FormGroup } from './common'
import FormElement from './form-element'
import Label from './label'
import styled from '@emotion/styled'

const HelpText = styled.p`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
`

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
        {this.props.helpText && <HelpText>{this.props.helpText}</HelpText>}
      </FormGroup>
    )
  }
}

export default InputText
