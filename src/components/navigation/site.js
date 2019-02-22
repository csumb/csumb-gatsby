import React from 'react'
import LinkInspect from 'components/link-inspect'
import Container from 'components/container'
import styled from '@emotion/styled'
import { colors, fonts } from 'style/theme'
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '@reach/menu-button/styles.css'

const SiteNavigationList = styled('ul')`
  list-style-type: none;
  margin: 0;
  font-size: 17px;
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
  padding: 1rem 1rem 1rem 0;
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
  padding: 1rem 1rem 1rem 0;
`

const SiteNavigationBar = styled('nav')`
  background: ${colors.primary.darkest};
  padding-bottom: 0.5rem;
  overflow: hidden;
`

const SiteNavigationItem = ({ to, children, navigationChildren, first }) => {
  return (
    <>
      {to ? (
        <SiteNavigationLink to={to} first={first}>
          {children}
        </SiteNavigationLink>
      ) : (
        <>
          {navigationChildren && (
            <SiteNavigationSubMenu
              first={first}
              navigationChildren={navigationChildren}
            >
              {children}
            </SiteNavigationSubMenu>
          )}
        </>
      )}
    </>
  )
}

const SiteNavigationArrow = styled('span')`
  font-size: 0.6rem;
  display: inline-block;
  margin-left: 0.25rem;
`

class SiteNavigationSubMenu extends React.Component {
  state = {
    isExpanded: false,
  }

  render() {
    const { children, navigationChildren } = this.props
    const { isExpanded } = this.state
    return (
      <Menu>
        <SiteNavigationMenuButton
          onClick={() => {
            this.setState({
              isExpanded: !isExpanded,
            })
          }}
        >
          {children}{' '}
          {isExpanded ? (
            <SiteNavigationArrow aria-hidden>
              <FontAwesomeIcon icon={faChevronUp} />
            </SiteNavigationArrow>
          ) : (
            <SiteNavigationArrow aria-hidden>
              <FontAwesomeIcon icon={faChevronDown} />
            </SiteNavigationArrow>
          )}
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
  }
}

class SiteNavigation extends React.Component {
  state = {
    isDesktop: true,
  }

  componentDidMount() {
    const mobileBreakpoint = 830
    const that = this
    const setWindowSize = () => {
      that.setState({
        isDesktop: window.innerWidth > mobileBreakpoint,
      })
    }

    window.addEventListener('resize', setWindowSize)

    setWindowSize()
  }

  render() {
    if (!this.props.navigation || !this.state.isDesktop) {
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
                  first={key === 0}
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
