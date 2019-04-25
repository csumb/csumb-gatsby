import React from 'react'
import { UserContext, setUserRole } from 'components/contexts/user'

class UserComponent extends React.Component {
  state = {
    user: false,
  }

  async componentDidMount() {
    window
      .fetch('https://csumb.okta.com/api/v1/users/me', {
        credentials: 'include',
      })
      .then(response => {
        return response.json()
      })
      .then(user => {
        user = setUserRole(user)
        user._username = user.profile.login.split('@').shift()
        this.setState({
          user: user,
        })
      })
      .catch(error => {
        this.setState({
          user: { anonymous: true },
        })
      })
  }

  render() {
    return (
      <UserContext.Provider value={{ user: this.state.user }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export const wrapPageElement = ({ element, props }) => {
  return <UserComponent {...props}>{element}</UserComponent>
}
