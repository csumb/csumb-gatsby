import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import Container from 'components/container'
import { colors } from 'style/theme'
import bp from 'style/breakpoints'

const siteHeaderSize = bp({
  fontSize: ['1.5rem', '2rem', '2.5rem'],
})

const SiteHeaderWrapper = styled('div')`
  background: ${colors.primary.darkest};
  padding: 1rem 0;
  h2 {
    margin: 0;
    ${siteHeaderSize};
    font-weight: 600;
  }
  a,
  a:visited {
    color: ${colors.white};
    text-decoration: none;
    &:hover {
      border-bottom: 1px solid ${colors.white};
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
