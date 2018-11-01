import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import PropTypes from 'prop-types'
import idGenerator from 'react-id-generator'
import styled from 'react-emotion'
import theme from './styles/theme'
import { css } from 'emotion'

const FormGroup = styled('div')`
  margin-bottom: 0.5rem;
  ${props => (props.inline ? `display: inline-block;` : ``)};
`

const LabelElement = styled('label')`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
`

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
        <LabelElement htmlFor={this.props.labelId}>
          {this.props.children}
          {this.props.isRequired ? (
            <VisuallyHidden>Required</VisuallyHidden>
          ) : null}
        </LabelElement>
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

const InputTextElement = styled('input')`
  border: 1px solid ${theme.colors.gray.deafult};
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
class InputText extends FormElement {
  render() {
    return (
      <FormGroup inline={this.props.inline}>
        <Label
          labelId={this.htmlId}
          isRequired={this.props.isRequired}
          isHidden={this.props.hideLabel}
        >
          {this.props.label}
        </Label>
        <InputTextElement
          type="text"
          {...this.cleanProps()}
          id={this.htmlId}
          innerRef={this.props.forwardedRef}
        />
      </FormGroup>
    )
  }
}

const InputTextareaElement = styled('textarea')`
  border: 1px solid ${theme.colors.gray.deafult};
  padding: 0.3rem;
`

class InputTextarea extends FormElement {
  render() {
    return (
      <FormGroup inline={this.props.inline}>
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
      </FormGroup>
    )
  }
}

class InputCheckbox extends FormElement {
  render() {
    return (
      <FormGroup inline={this.props.inline}>
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
      </FormGroup>
    )
  }
}

class InputRadio extends FormElement {
  render() {
    return (
      <FormGroup inline={this.props.inline}>
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
      </FormGroup>
    )
  }
}

class InputSelect extends FormElement {
  render() {
    return (
      <FormGroup inline={this.props.inline}>
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
      </FormGroup>
    )
  }
}

const FieldsetElement = styled('fieldset')`
  border: 1px solid ${theme.colors.gray.light};
  padding: 1rem;
`

const LegendElement = styled('legend')`
  float: left;
  font-size: 1.51572rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const Fieldset = props => (
  <FieldsetElement>
    <LegendElement>{props.legend}</LegendElement>
    <div
      className={css`
        clear: both;
      `}
    />
    {props.children}
  </FieldsetElement>
)

Fieldset.propTypes = {
  legend: PropTypes.string.isRequired,
}

const SubmitButton = styled('input')`
  padding: 1rem;
  display: inline-block;
  text-decoration: none;
  ${props =>
    props.nomargin
      ? `
    `
      : `margin: 1.5rem 0;`}
  color: ${theme.colors.primary.dark};
  border: 3px solid ${theme.colors.primary.dark};
  &:hover {
    color: ${theme.colors.white};
    background: ${theme.colors.primary.dark};
  }
  ${props =>
    props.huge
      ? `
    font-size: 2rem;
    padding: 0.6rem;
  `
      : ``};
`

const Submit = props => <SubmitButton type="submit" {...props} />

export {
  Label,
  Submit,
  Fieldset,
  InputText,
  InputTextarea,
  InputCheckbox,
  InputRadio,
  InputSelect,
}
