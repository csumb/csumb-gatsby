import React from 'react'
import { UserContext, setUserRole } from 'components/contexts/user'
import BreakpointContext from 'components/contexts/breakpoint'

class UserComponent extends React.Component {
  state = {
    user: false,
    width: 900,
    height: 900,
    isMobile: false,
  }

  async componentDidMount() {
    const mobileBreakpoint = 830

    const setWindowSize = () => {
      this.setState({
        isMobile: window.innerWidth <= mobileBreakpoint,
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', setWindowSize)

    fetch('https://csumb.okta.com/api/v1/users/me', {
      credentials: 'include',
      cache: 'no-store',
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
        if (
          typeof window !== 'undefined' &&
          typeof window.Rollbar !== 'undefined'
        ) {
          window.Rollbar.configure({
            payload: {
              person: {
                id: user._username,
                email: user.profile.email,
              },
            },
          })
        }
      })
      .catch(error => {
        this.setState({
          user: { anonymous: true },
        })
      })
  }

  render() {
    const { user, width, height, isMobile } = this.state
    return (
      <BreakpointContext.Provider
        value={{ width: width, height: height, isMobile: isMobile }}
      >
        <UserContext.Provider value={{ user: user }}>
          {this.props.children}
        </UserContext.Provider>
      </BreakpointContext.Provider>
    )
  }
}

export const wrapPageElement = ({ element, props }) => {
  return <UserComponent {...props}>{element}</UserComponent>
}
