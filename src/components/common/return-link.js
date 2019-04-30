import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'

const ReturnLinkElement = styled(Link)`
  margin-bottom: 1rem;
  display: inline-block;
`

const ReturnLink = ({ to, children }) => (
  <ReturnLinkElement to={to}>← {children}</ReturnLinkElement>
)

ReturnLink.propTypes = {
  to: PropTypes.string.isRequired,
}

export default ReturnLink
