import React, { Component } from 'react'
import styled from '@emotion/styled'
import { colors, fonts } from '../../../../style'
import { Menu, MenuList, MenuButton, MenuLink } from '../../../common/menu'
import { UserContext } from '../../../contexts/user'
import Link from 'gatsby-link'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const userLinkStyles = `
  color: ${colors.primary.darkest} !important;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  cursor: pointer;
  font-family: ${fonts.heading};
  &:hover {
    text-decoration: underline;
  }
`

const UserLoginLink = styled('a')`
  ${userLinkStyles};
  margin-right: 1rem;
`

const UserDropdownButton = styled(MenuButton)`
  border: none;
  background: transparent;
  cursor: pointer;
  margin-right: 1rem;
  font-weight: bold;
`

const UserDropdownMenuList = styled(MenuList)`
  border: 1px solid ${colors.black};
  background: ${colors.white};
  padding: 0;
  font-size: 0.85rem;
  a {
    color: ${colors.primary.darkest};
    text-decoration: none;
  }
`

const UserDropdownMenuLink = styled(MenuLink)`
  padding: 0.5rem;
  &:hover,
  &:focus {
    background: ${colors.primary.darkest};
    color: ${colors.white};
  }
  ${props =>
    props.isHidden &&
    `
    display: none !important;
  `}
`

const UserDashboardLink = styled(Link)`
  ${userLinkStyles};
  margin-right: 1rem;
`

class UserDropdown extends Component {
  state = {
    isEditor: false,
  }

  componentDidMount() {
    const sites = cookies.get('csumb-sites')
    this.setState({
      isEditor: sites && !Array.isArray(sites) && Object.keys(sites).length,
    })
  }

  handleLogout() {
    cookies.remove('csumb-sites')
    cookies.remove('csumbWebUser')
    cookies.remove('csumbSession')
  }

  render() {
    const { user } = this.props
    const { isEditor } = this.state
    if (!user) {
      return null
    }
    return (
      <Menu buttonId="user-account-menu">
        <UserDropdownButton>
          Your account <span aria-hidden>▾</span>
        </UserDropdownButton>
        <UserDropdownMenuList>
          <UserDropdownMenuLink component="a" href="/account">
            Manage account
          </UserDropdownMenuLink>
          <UserDropdownMenuLink
            component="a"
            href="/account/profile"
            isHidden={!user._isEmployee}
          >
            Public profile
          </UserDropdownMenuLink>
          <UserDropdownMenuLink
            component="a"
            href="https://edit.csumb.edu/saml_login?destination=/"
            target="_blank"
            rel="noopener noreferrer"
            isHidden={!isEditor}
          >
            Edit website
          </UserDropdownMenuLink>
          <UserDropdownMenuLink
            component="a"
            href="https://get.cbord.com/csumb"
            target="_blank"
            rel="noopener noreferrer"
          >
            OtterCard
          </UserDropdownMenuLink>

          <UserDropdownMenuLink
            component="a"
            href="https://www.laundryalert.com/cgi-bin/csumb721/LMPage"
            isHidden={!user._isStudent}
            target="_blank"
            rel="noopener noreferrer"
          >
            Laundry
          </UserDropdownMenuLink>
          <UserDropdownMenuLink component="a" href="/account/labs">
            Computer labs
          </UserDropdownMenuLink>
          <UserDropdownMenuLink component="a" href="/account/emergency">
            Emergency alerts
          </UserDropdownMenuLink>
          <UserDropdownMenuLink
            onClick={this.handleLogout.bind(this)}
            component="a"
            href="/.netlify/functions/logout"
          >
            Log out
          </UserDropdownMenuLink>
        </UserDropdownMenuList>
      </Menu>
    )
  }
}

class UserWidget extends Component {
  render() {
    const { loginLink } = this.props
    return (
      <>
        <UserContext.Consumer>
          {context => (
            <>
              {context.user === false ? (
                <></>
              ) : (
                <>
                  {context.user.anonymous ? (
                    <UserLoginLink href={loginLink}>Log in</UserLoginLink>
                  ) : (
                    <>
                      <UserDashboardLink to="/dashboard">
                        Dashboard
                      </UserDashboardLink>
                      <UserDropdown user={context.user} />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </UserContext.Consumer>
      </>
    )
  }
}

export default UserWidget
