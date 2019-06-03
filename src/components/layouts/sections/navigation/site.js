import React, { Component } from 'react'
import Container from 'components/common/container'
import styled from '@emotion/styled'
import { colors, fonts } from 'style/theme'
import {
  Menu,
  MenuList,
  MenuButton,
  MenuLink,
} from 'components/common/custom-reach-menu'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import slugify from 'slugify'
import BreakpointContext from 'components/contexts/breakpoint'

const navigationFontSize = '0.92rem'

const SiteNavigationList = styled('ul')`
  list-style-type: none;
  margin: 0;
  font-size: ${navigationFontSize};
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

const SiteNavigationLink = styled('a')`
  text-decoration: none;
  padding: 1rem 1rem 1rem 0;
  display: inline-block;
  &[aria-current='page'] {
    text-decoration: underline;
  }
`

const SiteNavigationSubList = styled(MenuList)`
  background: ${colors.primary.dark};
  padding: 0.5rem 0;
  margin-top: 10px;
  font-weight: 300;
  a {
    padding: 5px 20px;
    font-size: ${navigationFontSize};
    color: ${colors.white};
    display: block;
    text-decoration: none;
    &:hover {
      background: ${colors.primary.darkest};
    }
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
        <SiteNavigationLink href={to} first={first}>
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

class SiteNavigationSubMenu extends Component {
  state = {
    isExpanded: false,
  }

  render() {
    const { children, navigationChildren } = this.props
    const { isExpanded } = this.state
    return (
      <Menu buttonId={`site-menu-${slugify(children).toLowerCase()}`}>
        <SiteNavigationMenuButton
          onClick={() => {
            this.setState({
              isExpanded: !isExpanded,
            })
          }}
        >
          {children}{' '}
          {isExpanded ? (
            <SiteNavigationArrow>
              <FontAwesomeIcon icon={faChevronUp} />
            </SiteNavigationArrow>
          ) : (
            <SiteNavigationArrow>
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

const SiteNavigation = ({ navigation, overrideNavigation }) => {
  if (!navigation && !overrideNavigation) {
    return null
  }

  const siteNavigation = overrideNavigation
    ? overrideNavigation
    : JSON.parse(navigation)
  return (
    <BreakpointContext.Consumer>
      {({ isMobile }) => (
        <>
          {!isMobile && (
            <SiteNavigationBar>
              <Container>
                <SiteNavigationList>
                  {siteNavigation.map((item, key) => (
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
          )}
        </>
      )}
    </BreakpointContext.Consumer>
  )
}

export default SiteNavigation
