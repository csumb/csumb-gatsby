import React from 'react'
import { FormGroup } from './common'
import FormElement from './form-element'
import Label from './label'
import styled from '@emotion/styled'

const Radio = styled.input`
  margin-right: 1rem;
`

class InputRadio extends FormElement {
  render() {
    const { inline, isRequired, hideLabel, label, forwardedRef } = this.props
    return (
      <FormGroup inline={inline}>
        <Label
          labelId={this.htmlId}
          isRequired={isRequired}
          isHidden={hideLabel}
          smallText={true}
        >
          <Radio
            type="radio"
            id={this.htmlId}
            {...this.cleanProps()}
            ref={forwardedRef}
          />
          {label}
        </Label>
      </FormGroup>
    )
  }
}

export default InputRadio
