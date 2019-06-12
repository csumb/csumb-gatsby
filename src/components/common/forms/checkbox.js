import React from 'react'
import { FormGroup } from './styles'
import FormElement from './form-element'
import Label from './label'
import FormElement from './form-element'

const Checkbox = styled.input`
  margin-right: 1rem;
`

class InputCheckbox extends FormElement {
  render() {
    const { inline, isRequired, label, forwardedRef } = this.props
    return (
      <FormGroup inline={inline}>
        <Label labelId={this.htmlId} isRequired={isRequired} smallText={true}>
          <Checkbox
            type="checkbox"
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

export default InputCheckbox
