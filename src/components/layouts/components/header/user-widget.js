import React from 'react'
import styled from 'react-emotion'
import { colors } from 'components/styles/theme'
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button'
import { UserContext } from 'components/contexts/user'
import { IronDB } from 'iron-db'

import '@reach/menu-button/styles.css'

const UserLoginLink = styled('a')`
  color: ${colors.primary.darkest};
  margin-right: 1rem;
`

const UserDropdownButton = styled(MenuButton)`
  border: none;
  background: transparent;
  cursor: pointer;
  margin-right: 1rem;
`

const UserDropdownMenuList = styled(MenuList)`
  border: 1px solid ${colors.black};
  padding: 0;
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

class UserDropdown extends React.Component {
  handleLogout() {
    IronDB.remove('user')
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
                    <UserDropdown user={context.user} />
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
