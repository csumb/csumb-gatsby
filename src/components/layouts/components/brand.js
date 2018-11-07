import React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'
import logo from 'assets/images/csumb-logo-blue.svg'

const BrandImage = styled('img')`
  margin-bottom: 0;
`
const Brand = () => (
  <Link to="/">
    <BrandImage src={logo} alt="Cal State Monterey Bay" />
  </Link>
)

export default Brand
