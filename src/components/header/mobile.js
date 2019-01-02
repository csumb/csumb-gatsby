import React from 'react'
import Brand from './brand'
import { colors } from 'components/styles/theme'
import styled from 'react-emotion'
import { MobileNavigationLink } from './navigation-link'
import VisuallyHidden from 'components/visually-hidden'
import Search from './search'
import Container from 'components/container'
import UserWidget from './user-widget'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { Flex, Box } from '@rebass/grid/emotion'
import LinkInspect from 'components/link-inspect'
import Link from 'gatsby-link'

const HeaderMobileWrapper = styled('div')`
  padding: 0.5rem;
`

const HeaderMobileToggle = styled('button')`
  border: 0;
  font-size: 1.8rem;
  display: inline-block;
  float: left;
  margin-right: 1rem;
  width: 0.875em;
  padding: 0;
  cursor: pointer;
`

const HeaderMobileNavigation = styled('ul')`
  margin: 0;
  list-style: none;
  padding: 0;
  background: ${colors.primary.darkest};
`

const HeaderMobileSearch = styled('div')`
  background: white;
  padding: 0.5rem 0;
`

const HeaderMobileApply = styled(Link)`
  color: ${colors.white};
  background: ${colors.indicators.high};
  padding: 0.3rem;
  float: right;
  text-decoration: none;
`

const MobileSiteNavigationLink = styled(LinkInspect)`
  text-decoration: none;
  color: ${colors.black};
  &:visited {
    color: ${colors.black};
  }
  &:hover {
    text-decoration: underline;
  }
`

const HeaderMobileSiteNavigation = styled('div')`
  background: ${colors.primary.light};
  padding-bottom: 0.5rem;
`

const HeaderMobileSiteTitle = styled('h3')`
  margin: 0;
  padding: 0.8rem 0;
`

const SiteNavigationList = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    padding-bottom: 0.5rem;
  }
`

const MobileSiteNavigationMenuToggle = styled('button')`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`

const SiteNavigationSubItem = styled('div')`
  margin-left: -1rem;
  margin-right: -1rem;
  padding: 1rem 0;
  background: ${colors.primary.dark};
  a {
    color: ${colors.white};
  }
`

class MobileSiteNavigationSubMenu extends React.Component {
  state = {
    isOpen: false,
  }

  handleClick(event) {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const { children, navigationChildren } = this.props
    const { isOpen } = this.state
    return (
      <>
        <MobileSiteNavigationMenuToggle onClick={this.handleClick.bind(this)}>
          {children} <span aria-hidden>▾</span>
        </MobileSiteNavigationMenuToggle>
        {isOpen && (
          <SiteNavigationSubItem>
            <Container>
              <SiteNavigationList>
                {navigationChildren.map(({ url, name }, key) => (
                  <li key={key}>
                    <MobileSiteNavigationLink to={url}>
                      {name}
                    </MobileSiteNavigationLink>
                  </li>
                ))}
              </SiteNavigationList>
            </Container>
          </SiteNavigationSubItem>
        )}
      </>
    )
  }
}

const MobileSiteNavigationItem = ({ to, children, navigationChildren }) => {
  return (
    <>
      {to ? (
        <MobileSiteNavigationLink to={to}>{children}</MobileSiteNavigationLink>
      ) : (
          <>
            {navigationChildren && (
              <MobileSiteNavigationSubMenu
                navigationChildren={navigationChildren}
              >
                {children}
              </MobileSiteNavigationSubMenu>
            )}
          </>
        )}
    </>
  )
}

class HeaderMobile extends React.Component {
  state = {
    isOpen: false,
  }

  mobileToggle(event) {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const { isOpen } = this.state
    const siteNavigation = this.props.siteNavigation
      ? JSON.parse(this.props.siteNavigation)
      : false
    const { siteTitle } = this.props
    return (
      <header>
        <HeaderMobileWrapper>
          <Flex flexWrap="wrap">
            <Box width={[9 / 12]}>
              <HeaderMobileToggle
                onClick={this.mobileToggle.bind(this)}
                ref={node => {
                  this.navButtonRef = node
                }}
              >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                <VisuallyHidden>Menu</VisuallyHidden>
              </HeaderMobileToggle>
              <Brand mobile={true} />
            </Box>
            <Box width={[3 / 12]}>
              <HeaderMobileApply to="/apply">Apply</HeaderMobileApply>
            </Box>
          </Flex>
        </HeaderMobileWrapper>
        {isOpen && (
          <>
            <Container>
              <UserWidget />
              <HeaderMobileSearch>
                <Search swiftypeId={this.props.swiftypeId} fullWidth />
              </HeaderMobileSearch>
            </Container>
            <HeaderMobileNavigation
              tabIndex="-1"
              role="navigation"
              ref={node => {
                this.navRef = node
              }}
            >
              <MobileNavigationLink to="/admissions">
                Apply
              </MobileNavigationLink>
              <MobileNavigationLink to="/academics">
                Majors &amp; programs
              </MobileNavigationLink>
              <MobileNavigationLink to="/cost">
                Tuition &amp; aid
              </MobileNavigationLink>
              <MobileNavigationLink to="/everything">
                Everything else
              </MobileNavigationLink>
            </HeaderMobileNavigation>
            {siteNavigation && (
              <HeaderMobileSiteNavigation>
                <Container>
                  {siteTitle && (
                    <HeaderMobileSiteTitle>{siteTitle}</HeaderMobileSiteTitle>
                  )}
                  <SiteNavigationList>
                    {siteNavigation.map((item, key) => (
                      <li key={key}>
                        <MobileSiteNavigationItem
                          to={item.url}
                          navigationChildren={item.children}
                        >
                          {item.name}
                        </MobileSiteNavigationItem>
                      </li>
                    ))}
                  </SiteNavigationList>
                </Container>
              </HeaderMobileSiteNavigation>
            )}
          </>
        )}
      </header>
    )
  }
}

export default HeaderMobile
