import React from 'react'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from '@emotion/styled'
import slugify from 'slugify'
import Container from '../../../common/container'
import { colors, fonts, bp } from '../../../../style'
import { Menu, MenuList, MenuButton, MenuLink } from '../../../common/menu'
import BreakpointContext from '../../../contexts/breakpoint'
import { Link } from 'gatsby'

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

const SiteNavigationLink = styled(Link)`
  text-decoration: none;
  transition: all 0.5s;
  padding: 0.35rem 0.5rem;
  display: inline-block;
  position: relative;
  z-index: 1;
  &[aria-current='page'] {
    border-bottom: 3px solid ${colors.muted.mid} !important;
  }
  &:hover {
    transition: all 0.5s;
  }
  &:after {
    display: block;
    transition: all 0.5s;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 1px;
    content: '.';
    color: transparent;
    background: ${colors.primary.dark};
    visibility: none;
    opacity: 0;
    z-index: -1;
  }
  &:hover:after {
    opacity: 1;
    visibility: visible;
    height: 100%;
  }
`

const SiteNavigationSubList = styled(MenuList)`
  background: ${colors.primary.dark};
  padding: 0.75rem 0;
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
  padding: 0.35rem 0.5rem;
  position:relative;
  z-index: 1;
  &[aria-expanded="true"] {
    background: ${colors.primary.dark};
    .site-navigation-is-expanded {
      display: inline-block;
    }
    .site-navigation-is-hidden {
      display: none;
    }
  }
  &[aria-expanded="false"] {
    .site-navigation-is-expanded {
      display: none;
    }
    .site-navigation-is-hidden {
      display:inline-block;
  }
  &:hover {
    transition: all 0.5s;
  }
  &:after {
    display: block;
    transition: all 0.5s;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 1px;
    content: '.';
    color: transparent;
    background: ${colors.primary.dark};
    visibility: none;
    opacity: 0;
    z-index: -1;
  }
  &:hover:after {
    opacity: 1;
    visibility: visible;
    height: 100%;
  }
`

const SiteNavigationBar = styled('nav')`
  background: ${colors.primary.darkest};
  padding-bottom: 0.5rem;
  overflow: hidden;
  ${bp({
    display: ['none', 'none', 'block'],
  })}
`

const SiteNavigationArrow = styled('span')`
  font-size: 0.6rem;
  display: inline-block;
  margin-left: 0.25rem;
  max-width: 20px;
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

const SiteNavigationSubMenu = ({ children, navigationChildren }) => {
  return (
    <Menu buttonId={`site-menu-${slugify(children).toLowerCase()}`}>
      <SiteNavigationMenuButton>
        {children}{' '}
        <SiteNavigationArrow className="site-navigation-is-expanded">
          <FontAwesomeIcon icon={faChevronUp} />
        </SiteNavigationArrow>
        <SiteNavigationArrow className="site-navigation-is-hidden">
          <FontAwesomeIcon icon={faChevronDown} />
        </SiteNavigationArrow>
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
