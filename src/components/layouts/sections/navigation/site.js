import React from 'react'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from '@emotion/styled'
import slugify from 'slugify'
import Container from '../../../common/container'
import { colors, fonts, bp } from '../../../../style'
import { Menu, MenuList, MenuButton, MenuLink } from '../../../common/menu'
import BreakpointContext from '../../../contexts/breakpoint'

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
  &[aria-expanded="true"] {
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

const SiteNavigationSubMenu = ({ children, navigationChildren }) => {
  return (
    <Menu buttonId={`site-menu-${slugify(children).toLowerCase()}`}>
      <SiteNavigationMenuButton>
        {children}{' '}
        <SiteNavigationArrow className="site-navigation-is-expanded">
          <FontAwesomeIcon icon={faChevronUp} role={`presentation`} />
        </SiteNavigationArrow>
        <SiteNavigationArrow className="site-navigation-is-hidden">
          <FontAwesomeIcon icon={faChevronDown} role={`presentation`} />
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
