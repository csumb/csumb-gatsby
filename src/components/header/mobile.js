import React from 'react'
import Brand from './brand'
import { colors } from 'components/styles/theme'
import styled from 'react-emotion'
import { MobileNavigationLink } from './navigation-link'
import VisuallyHidden from 'components/visually-hidden'
import { Flex, Box } from '@rebass/grid/emotion'
import Search from './search'
import Container from 'components/container'
import { css } from 'react-emotion'
import UserWidget from './user-widget'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import LinkInspect from 'components/link-inspect'

const HeaderMobileWrapper = styled('div')`
  padding: 0.5rem 0.25rem;
`

const mobileButton = css`
  border: 0;
  padding: 0.3rem;
  font-size: 1.8rem;
`

const HeaderMobileToggle = styled('button')`
  ${mobileButton};
`

const HeaderMobileSearchToggle = styled('button')`
  ${mobileButton};
  margin-right: 1.5rem;
`

const HeaderMobileNavigation = styled('ul')`
  margin: 0;
  list-style: none;
  margin-top: 1rem;
  padding: 0;
  background: ${colors.primary.darkest};
`

const HeaderMobileSearch = styled('div')`
  background: white;
  padding: 0.5rem;
`

const MenuBox = styled(Box)`
  text-align: right;
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
    hasNavigation: false,
    hasSearch: false,
  }

  mobileToggle(event) {
    event.preventDefault()
    this.setState({
      hasNavigation: !this.state.hasNavigation,
      hasSearch: false,
    })
  }

  searchToggle(event) {
    event.preventDefault()
    this.setState({
      hasSearch: !this.state.hasSearch,
      hasNavigation: false,
    })
  }

  /*componentDidUpdate(prevProps, prevState) {
    if (!prevState.hasNavigation && this.state.hasNavigation) {
      this.navRef.focus()
    } else {
      this.navButtonRef.focus()
    }
  }*/

  render() {
    const { hasSearch, hasNavigation } = this.state
    const siteNavigation = this.props.siteNavigation
      ? JSON.parse(this.props.siteNavigation)
      : false
    const { siteTitle } = this.props
    return (
      <header>
        <HeaderMobileWrapper>
          <Flex flexWrap="wrap">
            <Box width={[1 / 2]} px={2}>
              <Brand mobile={true} />
            </Box>
            <MenuBox width={[1 / 2]} px={2}>
              <HeaderMobileSearchToggle
                onClick={this.searchToggle.bind(this)}
                ref={node => {
                  this.searchButtonRef = node
                }}
              >
                <VisuallyHidden>Search</VisuallyHidden>
                <FontAwesomeIcon icon={faSearch} />
              </HeaderMobileSearchToggle>
              <HeaderMobileToggle
                onClick={this.mobileToggle.bind(this)}
                ref={node => {
                  this.navButtonRef = node
                }}
              >
                <FontAwesomeIcon icon={faBars} />
                <VisuallyHidden>Menu</VisuallyHidden>
              </HeaderMobileToggle>
            </MenuBox>
          </Flex>
        </HeaderMobileWrapper>
        {hasSearch && (
          <HeaderMobileSearch>
            <Search swiftypeId={this.props.swiftypeId} fullWidth />
          </HeaderMobileSearch>
        )}
        {hasNavigation && (
          <>
            <Container>
              <UserWidget />
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
