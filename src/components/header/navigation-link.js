import React from 'react'
import { colors, fonts } from 'components/styles/theme'
import Link from 'gatsby-link'
import styled from '@emotion/styled'

const NavigationLinkList = styled('li')`
  margin-left: 0.5rem;
  display: inline-block;
  font-weight: 300;
  font-family: ${fonts.heading};
  a, a:visited {
    text-decoration: none;
    padding: 0.25rem 0.3rem;
    color: ${colors.primary.darkest};
    &:hover {
      text-decoration: underline;
    }
    &[aria-current='page'] {
      ${props =>
        props.apply
          ? `
        background: ${colors.indicators.high};
        color: ${colors.white};
        `
          : `
        background: ${colors.primary.dark};
        color: ${colors.white};
        `}
  }
`

const MobileNavigationLinkList = styled('li')`
  margin: 0;
  a {
    padding: 0.5rem 1rem;
    text-decoration: none;
    display: block;
    color: ${colors.white};
  }
`

const NavigationLink = props => (
  <NavigationLinkList>
    <Link to={props.to}>{props.children}</Link>
  </NavigationLinkList>
)

const MobileNavigationLink = props => (
  <MobileNavigationLinkList>
    <Link to={props.to}>{props.children}</Link>
  </MobileNavigationLinkList>
)

const NavigationLinkApply = props => (
  <NavigationLinkList apply>
    <Link to={props.to}>{props.children}</Link>
  </NavigationLinkList>
)

export { NavigationLink, MobileNavigationLink, NavigationLinkApply }
