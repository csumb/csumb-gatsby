import React from 'react'
import styled from '@emotion/styled'
import { colors, fonts } from 'style/theme'
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuLink,
} from '@reach/menu-button'
import { UserContext } from 'components/contexts/user'
import Link from 'gatsby-link'

import '@reach/menu-button/styles.css'

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
  padding: 0;
  font-family: ${fonts.body};
  a {
    color: ${colors.primary.darkest};
  }
`

const UserDropdownMenuLink = styled(MenuLink)`
  padding: 0.5rem;
  &:hover,
  &:focus {
    background: ${colors.primary.darkest};
    color: ${colors.white};
  }
`

const UserDropdownMenuLinkButton = styled(MenuItem)`
  padding: 0.5rem;
  background: transparent;
  border: none;
  &:hover,
  &:focus {
    background: ${colors.primary.darkest};
    color: ${colors.white};
  }
`

const UserDashboardLink = styled(Link)`
  ${userLinkStyles};
  margin-right: 1rem;
`

class UserDropdown extends React.Component {
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
    const { user } = this.props
    return (
      <Menu>
        <UserDropdownButton>
          Your account <span aria-hidden>▾</span>
        </UserDropdownButton>
        <UserDropdownMenuList>
          <UserDropdownMenuLink component="a" href="/account">
            Manage account
          </UserDropdownMenuLink>
          {user._isEmployee && (
            <UserDropdownMenuLink component="a" href="/account/profile">
              Public profile
            </UserDropdownMenuLink>
          )}
          <UserDropdownMenuLink component="a" href="/account/card">
            OtterCard
          </UserDropdownMenuLink>
          {(user._isStudent || true) && (
            <UserDropdownMenuLink component="a" href="/account/laundry">
              Laundry
            </UserDropdownMenuLink>
          )}
          <UserDropdownMenuLink component="a" href="/account/labs">
            Computer labs
          </UserDropdownMenuLink>
          <UserDropdownMenuLink component="a" href="/account/print">
            Print balance
          </UserDropdownMenuLink>
          <UserDropdownMenuLink component="a" href="/account/emergency">
            Emergency alerts
          </UserDropdownMenuLink>
          <UserDropdownMenuLinkButton onClick={this.handleLogout.bind(this)}>
            Log out
          </UserDropdownMenuLinkButton>
        </UserDropdownMenuList>
      </Menu>
    )
  }
}

class UserWidget extends React.Component {
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
