import React from 'react'
import styled from 'react-emotion'
import theme from 'components/styles/theme'
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button'
import User from 'components/user'

import '@reach/menu-button/styles.css'

const UserLoginLink = styled('a')`
  color: ${theme.colors.primary.darkest};
  margin-right: 1rem;
`

const UserDropdownButton = styled(MenuButton)`
  border: none;
  background: transparent;
  cursor: pointer;
`

const UserDropdownMenuList = styled(MenuList)`
  border: 1px solid ${theme.colors.black};
  padding: 0;
`

const UserDropdownMenuLink = styled(MenuLink)`
  padding: 0.5rem;
  &:hover,
  &:focus {
    background: ${theme.colors.primary.darkest};
    color: ${theme.colors.white};
  }
`

class UserDropdown extends React.Component {
  render() {
    return (
      <Menu>
        <UserDropdownButton>
          Your account <span aria-hidden>▾</span>
        </UserDropdownButton>
        <UserDropdownMenuList>
          <UserDropdownMenuLink component="a" href="/profile">
            Your profile
          </UserDropdownMenuLink>
          <UserDropdownMenuLink component="a" href="/profile/print">
            Print balance
          </UserDropdownMenuLink>
          <UserDropdownMenuLink
            component="a"
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
        <User>
          {user => (
            <>
              {user === false ? (
                <></>
              ) : (
                <>
                  {user === 'anonymous' ? (
                    <UserLoginLink href={this.props.loginLink}>
                      Log in
                    </UserLoginLink>
                  ) : (
                    <UserDropdown user={user} />
                  )}
                </>
              )}
            </>
          )}
        </User>
      </>
    )
  }
}

export default UserWidget
