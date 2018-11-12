import React from 'react'
import styled from 'react-emotion'
import Link from 'gatsby-link'
import Container from '../../container'
import { colors } from '../../styles/theme'

const SiteHeaderWrapper = styled('div')`
  background: ${colors.primary.darkest};
  padding: 1rem 0;
  h2 {
    margin: 0;
    font-size: 2.5rem;
  }
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const SiteHeader = ({ path, children }) => (
  <SiteHeaderWrapper>
    <Container>
      <h2>
        <Link to={path}>{children}</Link>
      </h2>
    </Container>
  </SiteHeaderWrapper>
)

export default SiteHeader
