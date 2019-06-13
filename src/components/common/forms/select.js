import React from 'react'
import { FormGroup, focusStyle } from './common'
import FormElement from './form-element'
import Label from './label'
import { colors } from '../../../style'
import Select from 'react-select'
import styled from '@emotion/styled'

const SelectElement = styled(Select)`
  .react-select__control--is-focused {
    ${focusStyle} !important;
  }
  import InputRadio from './radio' .react-select__control {
    border: 1px solid ${colors.gray.deafult};
    border-radius: 0;

    padding: 0.1rem;
    width: ${props => (props.small ? '30%' : '100%')};
    ${props =>
      props.huge
        ? `
padding: 0.3rem;
font-size: 2rem;
`
        : ``};
  }
`

class InputSelect extends FormElement {
  render() {
    const {
      inline,
      isRequired,
      hideLabel,
      label,
      forwardedRef,
      options,
    } = this.props
    return (
      <FormGroup inline={inline}>
        <Label
          labelId={this.htmlId}
          isRequired={isRequired}
          isHidden={hideLabel}
          isAriaLabel={true}
        >
          {label}
        </Label>
        <SelectElement
          {...this.cleanProps()}
          classNamePrefix="react-select"
          aria-labelledby={this.htmlId}
          options={options}
          ref={forwardedRef}
        />
      </FormGroup>
    )
  }
}

export default InputSelect
