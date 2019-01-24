import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import Container from 'components/container'
import { css } from 'react-emotion'
import { colors } from 'components/styles/theme'
import bp from 'components/styles/breakpoints'

const siteHeaderSize =
  bp({
    fontSize: ['1.5rem', '2rem', '2.5rem'],
  })

const SiteHeaderWrapper = styled('div')`
  background: ${colors.primary.darkest};
  padding: 1rem 0;
  h2 {
    margin: 0;
    ${siteHeaderSize};
  }
  a,
  a:visited {
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
