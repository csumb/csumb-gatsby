import React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'
import { colors } from 'components/styles/theme'

const BrandWrapper = styled('span')`
  a {
    color: ${colors.primary.darkest};
    padding: 0.2rem;
    line-height: 80%;
    text-decoration: none;
  }
`

const BrandLink = styled(Link)`
  font-weight: bold;
  ${props => (props.mobile ? `font-size: 1.2rem;` : `font-size: 2rem;`)};
`
const Brand = props => (
  <BrandWrapper>
    <BrandLink {...props} to="/">
      Cal State
      <br />
      Monterey Bay
    </BrandLink>
  </BrandWrapper>
)

export default Brand
