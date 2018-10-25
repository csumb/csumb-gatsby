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
    color: ${theme.colors.primary.dark};
    padding: 0.75rem;
    &:hover {
      background: ${theme.colors.primary.dark};
      color: #fff;
    }
  }
`

const NavigationLink = props => (
  <NavigationLinkList>
    <Link to={props.to}>{props.children}</Link>
  </NavigationLinkList>
)

export default NavigationLink
