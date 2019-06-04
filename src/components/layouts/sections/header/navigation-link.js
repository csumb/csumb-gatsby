import React from 'react'
import { colors, fonts } from 'style/theme'
import Link from 'gatsby-link'
import styled from '@emotion/styled'

const NavigationLinkList = styled.li`
  margin-left: 0.5rem;
  margin-bottom: 0;
  display: inline-block;
  font-weight: 300;
  font-size: 0.9rem;
  font-family: ${fonts.heading};
  a, a:visited {
    text-decoration: none;
    ${props =>
      props.last
        ? `padding: 0.25rem 0 0 0.25rem;`
        : `padding: 0.25rem 0.25rem 0 0.25rem;`}
    color: ${colors.primary.darkest};
    &:hover {
      text-decoration: underline;
    }
    &[aria-current='page'] {
      text-decoration: underline;
  }
`

const MobileNavigationLinkList = styled.li`
  margin: 0;
  a {
    padding: 0.5rem 1rem;
    text-decoration: none;
    display: block;
    color: ${colors.white};
  }
`

const NavigationLink = ({ last, to, children }) => (
  <NavigationLinkList last={last}>
    <Link to={to}>{children}</Link>
  </NavigationLinkList>
)

const MobileNavigationLink = ({ to, children }) => (
  <MobileNavigationLinkList>
    <Link to={to}>{children}</Link>
  </MobileNavigationLinkList>
)

export { NavigationLink, MobileNavigationLink }
