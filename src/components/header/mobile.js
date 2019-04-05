import React from 'react'
import Brand from './brand'
import { colors } from 'style/theme'
import styled from '@emotion/styled'
import { MobileNavigationLink } from './navigation-link'
import VisuallyHidden from 'components/visually-hidden'
import Search from './search'
import Container from 'components/container'
import { UserContext } from 'components/contexts/user'
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
  float: right;
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
  input {
    width: 100%;
  }
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

const userLinkStyle = `

font-weight: bold;
text-decoration: none;
display: block;
text-align: center;
margin-bottom: 0.5rem;
color: ${colors.primary.darkest} !important;
cursor: pointer;
`

const UserLoginLink = styled('a')`
  ${userLinkStyle};
`

const UserDashboardLink = styled(Link)`
  ${userLinkStyle};
`

const UserToggle = styled('button')`
  background: transparent;
  border: 0;
  width: 100%;
  ${userLinkStyle};
`

const YourAccountLink = styled(Link)`
  display: block;
  font-weight: bold;
  color: ${colors.primary.darkest};
  text-decoration: none;
  margin-bottom: 0.8rem;
`

const YourAccountWrapper = styled('div')`
  a {
    color: ${colors.primary.darkest};
  }
  margin-bottom: 1.5rem;
`

class MobileUserWidget extends React.Component {
  state = {
    isExpanded: false,
  }

  handleLogout(event) {
    event.preventDefault()
    fetch(`https://csumb.okta.com/api/v1/sessions/me`, {
      credentials: 'include',
    })
      .then(response => {
        return response.json()
      })
      .then(session => {
        if (session && session.id) {
          fetch(
            `https://api.csumb.edu/okta/session/end?token=${session.id}`
          ).then(response => {
            window.location.href = `${window.location.protocol}//${
              window.location.host
            }`
          })
        }
      })
  }

  render() {
    const { isExpanded } = this.state
    const { loginLink } = this.props
    return (
      <>
        <UserContext.Consumer>
          {context => (
            <>
              {context.user.anonymous ? (
                <UserLoginLink href={loginLink}>Log in</UserLoginLink>
              ) : (
                <>
                  <Flex flexWrap="wrap">
                    <Box width={1 / 2}>
                      <UserDashboardLink to="/dashboard">
                        Dashboard
                      </UserDashboardLink>
                    </Box>
                    <Box
                      width={1 / 2}
                      style={{
                        borderLeft: `1px solid ${colors.primary.darkest}`,
                      }}
                    >
                      <UserToggle
                        onClick={event => {
                          event.preventDefault()
                          this.setState({
                            isExpanded: !isExpanded,
                          })
                        }}
                      >
                        Your Account
                      </UserToggle>
                    </Box>
                  </Flex>
                  {isExpanded && <YourAccountList user={context.user} />}
                </>
              )}
            </>
          )}
        </UserContext.Consumer>
      </>
    )
  }
}

const YourAccountList = ({ user }) => (
  <YourAccountWrapper>
    <YourAccountLink to="/account">Manage account</YourAccountLink>
    {user._isEmployee && (
      <YourAccountLink to="/account/profile">Public profile</YourAccountLink>
    )}
    <YourAccountLink to="/account/card">OtterCard</YourAccountLink>
    {(user._isStudent || true) && (
      <YourAccountLink to="/account/laundry">Laundry</YourAccountLink>
    )}
    <YourAccountLink to="/account/print">Print balance</YourAccountLink>
    <YourAccountLink to="/account/emergency">Emergency alerts</YourAccountLink>
    <YourAccountLink>Log out</YourAccountLink>
  </YourAccountWrapper>
)

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

const HeaderMobileNavigationExpand = styled('div')`
  background: ${colors.primary.darkest};
`

const HeaderMobileNavigationButton = styled('button')`
  color: ${colors.white};
  background: transparent;
  font-weight: bold;
  border: 0;
  cursor: pointer;
  padding: 0.5rem 0;
  width: 100%;
  text-align: left;
`

class HeaderMobile extends React.Component {
  state = {
    isOpen: false,
    isMainMenuExpanded: false,
  }

  mobileToggle(event) {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const { isOpen, isMainMenuExpanded } = this.state
    const siteNavigation = this.props.siteNavigation
      ? JSON.parse(this.props.siteNavigation)
      : false
    const { siteTitle } = this.props
    return (
      <header>
        <HeaderMobileWrapper>
          <Flex flexWrap="wrap">
            <Box width={[9 / 12]}>
              <Brand mobile={true} />
            </Box>
            <Box width={[3 / 12]}>
              <HeaderMobileToggle
                onClick={this.mobileToggle.bind(this)}
                ref={node => {
                  this.navButtonRef = node
                }}
              >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                <VisuallyHidden>Menu</VisuallyHidden>
              </HeaderMobileToggle>
            </Box>
          </Flex>
        </HeaderMobileWrapper>
        {isOpen && (
          <>
            <Container>
              <HeaderMobileSearch>
                <Search
                  swiftypeId={this.props.swiftypeId}
                  fullWidth
                  isMobile={true}
                />
              </HeaderMobileSearch>
              <MobileUserWidget loginLink={this.props.loginLink} />
            </Container>
            {siteNavigation && (
              <HeaderMobileNavigationExpand>
                <Container>
                  <HeaderMobileNavigationButton
                    onClick={event => {
                      event.preventDefault()
                      this.setState({
                        isMainMenuExpanded: !this.state.isMainMenuExpanded,
                      })
                    }}
                  >
                    CSUMB main menu
                    <span aria-hidden="true"> ▾</span>
                  </HeaderMobileNavigationButton>
                </Container>
              </HeaderMobileNavigationExpand>
            )}
            {(isMainMenuExpanded || !siteNavigation) && (
              <HeaderMobileNavigation
                tabIndex="-1"
                role="navigation"
                ref={node => {
                  this.navRef = node
                }}
              >
                <MobileNavigationLink to="/about">About</MobileNavigationLink>
                <MobileNavigationLink to="/cost">
                  Cost &amp; aid
                </MobileNavigationLink>
                <MobileNavigationLink to="/academics">
                  Academics
                </MobileNavigationLink>
                <MobileNavigationLink to="/life">
                  Campus life
                </MobileNavigationLink>
                <MobileNavigationLink to="/alumni">Alumni</MobileNavigationLink>
                <MobileNavigationLink to="/everything">
                  Everything else
                </MobileNavigationLink>
              </HeaderMobileNavigation>
            )}
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
