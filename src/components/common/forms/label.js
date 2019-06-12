import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import VisuallyHidden from '../../utilities/visually-hidden'

const LabelElement = styled.label`
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

const Required = styled.strong`
  font-size: 1rem;
  display: inline-block;
  margin-left: 1rem;
  color: ${colors.indicators.high};
`

const LabelWrapper = ({ isHidden, children }) => {
  if (isHidden) {
    return <VisuallyHidden>{children}</VisuallyHidden>
  }
  return <>{children}</>
}

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

export default Label
