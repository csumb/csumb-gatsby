import React from 'react'
import theme from '../../styles/theme'
import Link from 'gatsby-link'
import styled from 'react-emotion'

const NavigationLinkList = styled('li')`
  margin-left: 0.5rem;
  display: inline-block;
  a {
    font-weight: bold;
    text-decoration: none;
    padding: 0.75rem;
    ${props =>
      props.apply
        ? `color: ${theme.colors.indicators.high};
        border: 3px solid ${theme.colors.indicators.high};`
        : `color: ${theme.colors.primary.darkest};`} &:hover {
          ${props =>
            props.apply
              ? `background: ${theme.colors.indicators.high};`
              : `background: ${theme.colors.primary.darkest};`}
              
      color: ${theme.colors.white};
    }
    &[aria-current='page'] {
      background: ${theme.colors.primary.dark};
      color: ${theme.colors.white};
    }
  }
`

const MobileNavigationLinkList = styled('li')`
  padding: 0.5rem 1rem;
  a {
    text-decoration: none;
    color: ${theme.colors.white};
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
