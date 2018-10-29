import React from 'react'
import styled from 'react-emotion'
import theme from '../../styles/theme'
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button'

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

class User extends React.Component {
  state = {
    user: false,
    checkedUser: false,
  }

  componentDidMount() {
    window
      .fetch('https://csumb.okta.com/api/v1/users/me', {
        credentials: 'include',
      })
      .then(response => {
        return response.json()
      })
      .then(user => {
        this.setState({
          user: user,
        })
      })
      .catch(error => {
        this.setState({
          user: 'anonymous',
        })
      })
  }

  render() {
    if (!this.state.user) {
      return null
    }
    return (
      <>
        {this.state.user ? (
          <UserDropdown user={this.state.user} />
        ) : (
          <UserLoginLink href={this.props.loginLink}>Log in</UserLoginLink>
        )}
      </>
    )
  }
}

export default User
