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
    color: ${theme.colors.primary.darkest};
    padding: 0.75rem;
    &:hover {
      background: ${theme.colors.primary.darkest};
      color: #fff;
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

export { NavigationLink, MobileNavigationLink }
