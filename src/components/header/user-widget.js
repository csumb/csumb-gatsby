import React from 'react'
import styled from 'react-emotion'
import { colors, fonts } from 'components/styles/theme'
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button'
import { UserContext } from 'components/contexts/user'
import Link from 'gatsby-link'
import { IronDB } from 'iron-db'
import { css } from 'emotion'

import '@reach/menu-button/styles.css'

const userLinkStyles = css`
color: ${colors.primary.darkest} !important;
text-decoration: none;
font-weight: bold;
display: inline-block;
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
  font-family: ${fonts.sansSerif};
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

const UserDashboardLink = styled(Link)`
  ${userLinkStyles};
  margin-right: 1rem;
`

class UserDropdown extends React.Component {
  handleLogout() {
    IronDB.remove('user')
    IronDB.remove('messageCount')
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
          {user._isEmployee ? (
            <UserDropdownMenuLink component="a" href="/account/profile">
              Public profile
            </UserDropdownMenuLink>
          ) : (
              <></>
            )}
          <UserDropdownMenuLink component="a" href="/account/card">
            OtterCard
          </UserDropdownMenuLink>
          <UserDropdownMenuLink component="a" href="/account/print">
            Print balance
          </UserDropdownMenuLink>
          <UserDropdownMenuLink
            component="a"
            onClick={this.handleLogout.bind(this)}
            href="https://csumb.okta.com/logout"
          >
            Log out
          </UserDropdownMenuLink>
        </UserDropdownMenuList>
      </Menu>
    )
  }
}

class UserWidget extends React.Component {
  render() {
    return (
      <>
        <UserContext.Consumer>
          {context => (
            <>
              {context.user === false ? (
                <></>
              ) : (
                  <>
                    {context.user === 'anonymous' ? (
                      <UserLoginLink href={this.props.loginLink}>
                        Log in
                    </UserLoginLink>
                    ) : (
                        <>
                          <UserDashboardLink to="/dashboard">
                            Dashboard
                        <UnreadMessages user={context.user} />
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

const UnreadMessageCounter = styled('span')`
  display: inline-block;
  background: ${colors.indicators.high};
  color: ${colors.white};
  font-size: 0.5rem;
  margin-left: 0.3rem;
  font-weight: bold;
  border-radius: 8px;
  padding: 0.1rem 0.3rem;
  float: right;
`

class UnreadMessages extends React.Component {
  state = {
    unread: false,
  }

  getRoles() {
    const { user } = this.props
    let roles = []
    if (user._isStaff) {
      roles.push('staff')
    }
    if (user._isFaculty) {
      roles.push('faculty')
    }
    if (user._isEmployee) {
      roles.push('staff')
    }
    if (user._isStudent) {
      roles.push('student')
    }
    if (user._isApplicant) {
      roles.push('applicant')
    }
    return roles.join(',')
  }

  componentDidMount() {
    const login = this.props.user.profile.login.split('@').shift()
    window
      .fetch(
        `https://messaging-staging.herokuapp.com/api/unread/${login}/${this.getRoles()}`
      )
      .then(response => {
        return response.json()
      })
      .then(messages => {
        this.setState({
          unread: messages.unread,
        })

        IronDB.set('messageCount', messages.unread)
      })
      .catch(error => {
        this.setState({
          unread: false,
        })
      })
  }
  render() {
    return (
      <>
        {this.state.unread && (
          <UnreadMessageCounter>{this.state.unread}</UnreadMessageCounter>
        )}
      </>
    )
  }
}

export default UserWidget
