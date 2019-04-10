import React from 'react'
import VisuallyHidden from 'components/visually-hidden'
import PropTypes from 'prop-types'
import idGenerator from 'react-id-generator'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import { css } from 'emotion'
import Select from 'react-select'

const focusStyle = `
transition:all 100ms;
  outline: 0.25rem solid ${colors.primary.default}
`

const FormGroup = styled('div')`
  ${props => (props.noMargin ? `` : `margin-bottom: 0.5rem;`)}
  ${props => (props.inline ? `display: inline-block;` : ``)};
`

const LabelElement = styled('label')`
  margin-bottom: 0.5rem;
  display: block;
  ${props =>
    props.smallText
      ? `
      cursor: pointer;
    `
      : `
    font-weight: bold;
    font-size: 1.5rem;`};
`
const LabelWrapper = ({ isHidden, children }) => {
  if (isHidden) {
    return <VisuallyHidden>{children}</VisuallyHidden>
  }
  return <>{children}</>
}

const Required = styled('strong')`
  font-size: 1rem;
  display: inline-block;
  margin-left: 1rem;
  color: ${colors.indicators.high};
`

const Label = ({
  labelId,
  children,
  isRequired,
  smallText,
  isHidden,
  isAriaLabel,
}) => (
  <LabelWrapper isHidden={isHidden}>
    <LabelElement
      htmlFor={labelId}
      smallText={smallText}
      id={isAriaLabel && labelId}
    >
      {children}
      {isRequired ? <Required>Required</Required> : null}
    </LabelElement>
  </LabelWrapper>
)

Label.propTypes = {
  labelId: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  isRequired: PropTypes.bool,
  smallText: PropTypes.bool,
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
  &:focus {
    ${focusStyle};
  }
  border-radius: 0;
  border: 1px solid ${colors.gray.deafult};
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

class InputDate extends FormElement {
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
          type="date"
          defaultValue={defaultValue}
          {...this.cleanProps()}
          id={this.htmlId}
          innerRef={forwardedRef}
        />
      </FormGroup>
    )
  }
}
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

const InputTextareaElement = styled('textarea')`
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

const InputCheckboxRadio = styled('input')`
  margin-right: 1rem;
`
class InputCheckbox extends FormElement {
  render() {
    const { inline, isRequired, label, forwardedRef } = this.props
    return (
      <FormGroup inline={inline}>
        <Label labelId={this.htmlId} isRequired={isRequired} smallText={true}>
          <InputCheckboxRadio
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
          <InputCheckboxRadio
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

const SelectElement = styled(Select)`
  .react-select__control--is-focused {
    ${focusStyle} !important;
  }
  .react-select__control {
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

const FieldsetElement = styled('fieldset')`
  border: 1px solid ${colors.gray.light};
  padding: 1rem;
`

const LegendElement = styled('legend')`
  float: left;
  font-size: 1.51572rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const Fieldset = ({ legend, children }) => (
  <FieldsetElement>
    <LegendElement>{legend}</LegendElement>
    <div
      className={css`
        clear: both;
      `}
    />
    {children}
  </FieldsetElement>
)

Fieldset.propTypes = {
  legend: PropTypes.string.isRequired,
}

const SubmitButton = styled('input')`
  &:focus {
    ${focusStyle};
  }
  padding: 1rem;
  border: none;
  border-radius: 0;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  ${props =>
    props.nomargin
      ? `
    `
      : `margin: 1.5rem 0;`}

  color: ${colors.white} !important;
  background: ${colors.buttons.default};
  ${props =>
    props.huge
      ? `
    font-size: 2rem;
    padding: 0.6rem;
  `
      : ``};
  ${props =>
    props.small
      ? `
    padding: 0.35rem;
  `
      : ``};
`

const Submit = props => <SubmitButton type="submit" {...props} />

export {
  Label,
  Submit,
  Fieldset,
  InputText,
  InputPassword,
  InputTextarea,
  InputCheckbox,
  InputRadio,
  InputSelect,
  InputDate,
}
