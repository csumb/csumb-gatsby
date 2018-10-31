import React from 'react'
import LinkInspect from '../../link-inspect'
import Container from '../../container'
import styled from 'react-emotion'
import theme from '../../styles/theme'
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button'

import '@reach/menu-button/styles.css'

const SiteNavigationList = styled('ul')`
  list-style-type: none;
  margin: 0;
  li {
    display: inline-block;
    margin: 0 1rem 0 0;
  }
  a {
    color: ${theme.colors.white};
  }
`

const SiteNavigationLink = styled(LinkInspect)`
  text-decoration: none;
`

const SiteNavigationSubLink = styled(MenuLink)`
  text-decoration: none;
  color: ${theme.colors.white};
`

const SiteNavigationSubList = styled(MenuList)`
  background: ${theme.colors.primary.dark};
  a {
    color: ${theme.colors.white};
  }
`

const SiteNavigationMenuButton = styled(MenuButton)`
  background: transparent;
  color: ${theme.colors.white};
  border: none;
`

const SiteNavigationBar = styled('nav')`
  background: ${theme.colors.primary.darkest};
  padding-bottom: 0.5rem;
`

const SiteNavigationItem = props => {
  return (
    <>
      {props.to ? (
        <SiteNavigationLink to={props.to}>{props.children}</SiteNavigationLink>
      ) : (
        <SiteNavigationSubMenu navigationChildren={props.navigationChildren}>
          {props.children}
        </SiteNavigationSubMenu>
      )}
    </>
  )
}

const SiteNavigationSubMenu = props => (
  <Menu>
    <SiteNavigationMenuButton>
      {props.children} <span aria-hidden>▾</span>
    </SiteNavigationMenuButton>
    <SiteNavigationSubList>
      {props.navigationChildren.map((child, key) => (
        <SiteNavigationSubLink key={key} component="a" href={child.url}>
          {child.name}
        </SiteNavigationSubLink>
      ))}
    </SiteNavigationSubList>
  </Menu>
)

class SiteNavigation extends React.Component {
  render() {
    if (!this.props.navigation) {
      return null
    }

    const navigation = JSON.parse(this.props.navigation)

    return (
      <SiteNavigationBar>
        <Container>
          <SiteNavigationList>
            {navigation.map((item, key) => (
              <li key={key}>
                <SiteNavigationItem
                  to={item.url}
                  navigationChildren={item.children}
                >
                  {item.name}
                </SiteNavigationItem>
              </li>
            ))}
          </SiteNavigationList>
        </Container>
      </SiteNavigationBar>
    )
  }
}

export default SiteNavigation
