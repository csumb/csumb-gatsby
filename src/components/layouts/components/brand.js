import React from 'react'
import theme from '../../styles/theme'
import Link from 'gatsby-link'
import styled from 'react-emotion'

const BrandLink = styled(Link)`
  font-weight: bold;
  font-size: 150%;
  color: ${theme.colors.primary.darkest};
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
