import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import PropTypes from 'prop-types'
import idGenerator from 'react-id-generator'
import styled from 'react-emotion'

class Label extends React.Component {
  render() {
    const LabelWrapper = props => {
      if (this.props.isHidden) {
        return <VisuallyHidden>{props.children}</VisuallyHidden>
      }
      return <>{props.children}</>
    }

    return (
      <LabelWrapper>
        <label htmlFor={this.props.labelId}>
          {this.props.children}
          {this.props.isRequired ? (
            <VisuallyHidden>Required</VisuallyHidden>
          ) : null}
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

  cleanProps(additional) {
    let props = Object.assign({}, this.props)
    delete props.isRequired
    delete props.hideLabel
    delete props.forwardedRef
    if (typeof additional !== 'undefined') {
      additional.forEach(prop => {
        delete props[prop]
      })
    }
    return props
  }
}

FormElement.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  hideLabel: PropTypes.bool,
  forwardedRef: PropTypes.func,
}

const InputTextElemnt = styled('input')`
  border: 1px solid #000;
  padding: 0.3rem;
`
class InputText extends FormElement {
  render() {
    return (
      <>
        <Label
          labelId={this.htmlId}
          isRequired={this.props.isRequired}
          isHidden={this.props.hideLabel}
        >
          {this.props.label}
        </Label>
        <InputTextElemnt
          type="text"
          {...this.cleanProps()}
          innerRef={this.props.forwardedRef}
        />
      </>
    )
  }
}

const InputTextareaElement = styled('textarea')`
  border: 1px solid #000;
  padding: 0.3rem;
`

class InputTextarea extends FormElement {
  render() {
    return (
      <>
        <Label
          labelId={this.htmlId}
          isRequired={this.props.isRequired}
          isHidden={this.props.hideLabel}
        >
          {this.props.label}
        </Label>
        <InputTextareaElement
          type="text"
          {...this.cleanProps(['value'])}
          ref={this.props.forwardedRef}
        >
          {this.props.value}
        </InputTextareaElement>
      </>
    )
  }
}

class InputCheckbox extends FormElement {
  render() {
    return (
      <>
        <Label
          labelId={this.htmlId}
          isRequired={this.props.isRequired}
          isHidden={this.props.hideLabel}
        >
          <input
            type="checkbox"
            {...this.cleanProps()}
            ref={this.props.forwardedRef}
          />
          {this.props.label}
        </Label>
      </>
    )
  }
}

class InputRadio extends FormElement {
  render() {
    return (
      <>
        <Label
          labelId={this.htmlId}
          isRequired={this.props.isRequired}
          isHidden={this.props.hideLabel}
        >
          <input
            type="radio"
            {...this.cleanProps()}
            ref={this.props.forwardedRef}
          />
          {this.props.label}
        </Label>
      </>
    )
  }
}

class InputSelect extends FormElement {
  render() {
    return (
      <>
        <Label
          labelId={this.htmlId}
          isRequired={this.props.isRequired}
          isHidden={this.props.hideLabel}
        >
          {this.props.label}
        </Label>
        <select {...this.cleanProps()} ref={this.props.forwardedRef}>
          {this.props.children}
        </select>
      </>
    )
  }
}

export {
  Label,
  InputText,
  InputTextarea,
  InputCheckbox,
  InputRadio,
  InputSelect,
}
