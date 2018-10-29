import React from 'react'
import styled from 'react-emotion'
import Link from 'gatsby-link'
import Container from '../../container'
import theme from '../../styles/theme'

const SiteHeaderWrapper = styled('div')`
  background: ${theme.colors.primary.darkest};
  padding: 0.5rem 0;
  h2 {
    margin: 0;
  }
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const SiteHeader = props => (
  <SiteHeaderWrapper>
    <Container>
      <h2>
        <Link to={props.path}>{props.title}</Link>
      </h2>
    </Container>
  </SiteHeaderWrapper>
)

export default SiteHeader
