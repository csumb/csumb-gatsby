import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import PropTypes from 'prop-types'
import idGenerator from 'react-id-generator'
import { css } from 'emotion'

class Label extends React.Component {

  render() {

    const LabelWrapper = (props) => {
      if(this.props.isHidden) {
        return (
          <VisuallyHidden>{props.children}</VisuallyHidden>
        )
      }
      return <>{props.children}</>
    }

    return (
      <LabelWrapper>
        <label for={this.props.labelId}>
          {this.props.children}
          {(this.props.isRequired) ? 
            <VisuallyHidden>Required</VisuallyHidden> : null 
          }
        </label>
      </LabelWrapper>
    )
  }

}

Label.propTypes = {
  labelId: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  isRequired: PropTypes.bool,
}

class FormElement extends React.Component {
  constructor(props) {
    super(props)
    this.htmlId = idGenerator()
  }
}

FormElement.propTypes = {
  name: PropTypes.string.isRequried,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  hideLabel: PropTypes.bool
}

class InputText extends FormElement {
  render() {
    return (
      <>
        <Label
          labelId={this.htmlId}
          isRequired={this.props.isRequired}
          isHidden={this.props.hideLabel}>
          {this.props.label}
        </Label>
        <input 
          type="text" 
          name={this.props.name} 
          value={this.props.value} 
          placeholder={this.props.placeholder}
          className={css`
            border: 1px solid #000;
            padding: 0.3rem;
          `}
        />
      </>
    )
  }
}







export { Label, InputText }