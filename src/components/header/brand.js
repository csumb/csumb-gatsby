import React from 'react'
import Link from 'gatsby-link'
import styled from '@emotion/styled'
import logo from 'assets/images/csumb-logo-blue.svg'

const BrandImage = styled('img')`
  margin: 0;
  ${props => props.mobile && `width: 170px;`}
`

const Brand = props => (
  <>
    <Link to="/">
      <BrandImage
        {...props}
        src={logo}
        alt="California State University Monterey Bay"
      />
    </Link>
  </>
)

export default Brand
