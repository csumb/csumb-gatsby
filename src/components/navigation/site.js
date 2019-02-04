import React from 'react'
import LinkInspect from 'components/link-inspect'
import Container from 'components/container'
import styled from '@emotion/styled'
import { colors, fonts } from '../styles/theme'
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button'

import '@reach/menu-button/styles.css'

const SiteNavigationList = styled('ul')`
  list-style-type: none;
  margin: 0;
  li {
    display: inline-block;
    margin: 0;
    font-weight: 300;
    font-family: ${fonts.heading};
  }
  a,
  a:visited {
    color: ${colors.white};
  }
`

const SiteNavigationLink = styled(LinkInspect)`
  text-decoration: none;
  padding: 1rem;
  &[aria-current='page'] {
    text-decoration: underline;
  }
`

const SiteNavigationSubList = styled(MenuList)`
  background: ${colors.primary.dark};
  padding: 0;
  margin-top: 10px;
  font-weight: 300;
  font-family: ${fonts.heading};
  a {
    color: ${colors.white};
    font-family: ${fonts.body};
    font-size: 20px;
    text-decoration: none;
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
        <MenuLink key={key} component="a" href={child.url}>
          {child.name}
        </MenuLink>
      ))}
    </SiteNavigationSubList>
  </Menu>
)

class SiteNavigation extends React.Component {
  state = {
    isDesktop: true,
  }

  componentDidMount() {
    const mobileBreakpoint = 830
    const that = this
    const setWindowSize = () => {
      that.setState({
        isDekstop: window.innerWidth > mobileBreakpoint,
      })
    }

    window.addEventListener('resize', setWindowSize)

    setWindowSize()
  }

  render() {
    if (!this.props.navigation) {
      return null
    }

    const navigation = JSON.parse(this.props.navigation)
    const { isDesktop } = this.state
    return (
      <>
        {isDesktop && (
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
        )}
      </>
    )
  }
}

export default SiteNavigation
