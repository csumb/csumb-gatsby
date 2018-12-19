import React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'
import { colors } from 'components/styles/theme'

const BrandLink = styled(Link)`
  font-weight: bold;
  ${props => props.mobile ?
    `font-size: 1.4rem;` :
    `font-size: 2rem;`}
  color: ${colors.primary.darkest} !important;
  text-decoration: none;
  line-height: 80%;
  &:hover {
    text-decoration: underline;
  }
`
const Brand = (props) => (
  <BrandLink {...props} to="/">
    Cal State
    <br />
    Monterey Bay
  </BrandLink>
)

export default Brand
