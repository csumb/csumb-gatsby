import React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'
import theme from 'components/styles/theme'

const BrandLink = styled(Link)`
  font-weight: bold;
  font-size: 2rem;
  color: ${theme.colors.primary.darkest} !important;
  text-decoration: none;
  line-height: 80%;
  &:hover {
    text-decoration: underline;
  }
`
const Brand = () => (
  <BrandLink to="/">
    Cal State
    <br />
    Monterey Bay
  </BrandLink>
)

export default Brand
