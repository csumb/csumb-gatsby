import React from 'react'
import { colors } from 'components/styles/theme'
import Link from 'gatsby-link'
import styled from '@emotion/styled'

const NavigationLinkList = styled('li')`
  margin-left: 0.5rem;
  display: inline-block;
  a, a:visited {
    font-weight: bold;
    text-decoration: none;
    padding: 0.75rem;
    ${props =>
      props.apply
        ? `color: ${colors.indicators.high};
        border: 3px solid ${colors.indicators.high};
        `
        : `color: ${colors.primary.darkest};`}
    &:hover {
          ${props =>
            props.apply
              ? `background: ${colors.indicators.high};`
              : `background: ${colors.primary.darkest};`}
                
      color: ${colors.white};
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
