import React from 'react'
import LinkInspect from '../../link-inspect'
import Container from '../../container'
import styled from 'react-emotion'
import { colors, fonts } from '../../styles/theme'
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button'

import '@reach/menu-button/styles.css'

const SiteNavigationList = styled('ul')`
  list-style-type: none;
  margin: 0;
  li {
    display: inline-block;
    margin: 0;
  }
  a {
    color: ${colors.white};
  }
`

const SiteNavigationLink = styled(LinkInspect)`
  text-decoration: none;
  padding: 1rem;
  &[aria-current='page'] {
    background: ${colors.primary.dark};
  }
`

const SiteNavigationSubLink = styled(MenuLink)`
  text-decoration: none;
  color: ${colors.white};
`

const SiteNavigationSubList = styled(MenuList)`
  background: ${colors.primary.dark};
  padding: 0;
  a {
    color: ${colors.white};
    font-family: ${fonts.sansSerif};
  }
`

const SiteNavigationMenuButton = styled(MenuButton)`
  background: transparent;
  color: ${colors.white};
  border: none;
  cursor: pointer;
`

const SiteNavigationBar = styled('nav')`
  background: ${colors.primary.darkest};
  padding-bottom: 0.5rem;
  overflow: hidden;
`

const SiteNavigationItem = ({ to, children, navigationChildren }) => {
  return (
    <>
      {to ? (
        <SiteNavigationLink to={to}>{children}</SiteNavigationLink>
      ) : (
        <>
          {navigationChildren && (
            <SiteNavigationSubMenu navigationChildren={navigationChildren}>
              {children}
            </SiteNavigationSubMenu>
          )}
        </>
      )}
    </>
  )
}

const SiteNavigationSubMenu = ({ children, navigationChildren }) => (
  <Menu>
    <SiteNavigationMenuButton>
      {children} <span aria-hidden>▾</span>
    </SiteNavigationMenuButton>
    <SiteNavigationSubList>
      {navigationChildren.map((child, key) => (
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
