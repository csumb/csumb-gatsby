import React from 'react'
import styled from '@emotion/styled'
import ClearFix from '../../utilities/clearfix'
import PropTypes from 'prop-types'
import { colors } from '../../../style'

const FieldsetElement = styled.fieldset`
  border: 1px solid ${colors.gray.light};
  padding: 1rem;
`

const LegendElement = styled.legend`
  float: left;
  font-size: 1.51572rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const Fieldset = ({ legend, children }) => (
  <FieldsetElement>
    <LegendElement>{legend}</LegendElement>
    <ClearFix />
    {children}
  </FieldsetElement>
)

Fieldset.propTypes = {
  legend: PropTypes.string.isRequired,
}

export default Fieldset
