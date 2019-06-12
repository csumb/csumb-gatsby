import React from 'react'
import { UserContext, setUserRole } from './src/components/contexts/user'
import BreakpointContext from './src/components/contexts/breakpoint'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

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
    setWindowSize()
    const profile = cookies.get('csumbUser')
    if (!profile) {
      this.setState({
        user: { anonymous: true },
      })
      return
    }
    const session = cookies.get('csumbSession')
    let user = {
      profile: profile,
      session: session,
    }
    if (typeof user.profile.roles !== 'undefined') {
      user.profile.roles = user.profile.roles.split(',')
    }
    user._username = user.profile.login.split('@').shift()
    user = setUserRole(user)
    this.setState({
      user: user,
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
