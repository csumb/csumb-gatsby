import React from 'react'
import { UserContext, setUserRole } from './src/components/contexts/user'
import BreakpointContext from './src/components/contexts/breakpoint'
import Cookies from 'universal-cookie'
import { globalHistory } from '@reach/router'

const cookies = new Cookies()

export const onInitialClientRender = () => {
  /**
   * This is a workaround for a bug in Gatsby
   *
   * See https://github.com/gatsbyjs/gatsby/issues/8357 for more details
   */
  globalHistory._onTransitionComplete()
}

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
    const profile = cookies.get('csumbWebUser')
    if (!profile) {
      this.setState({
        user: { anonymous: true },
      })
      return
    }
    let user = {
      profile: profile,
      session: profile.token,
    }
    if (typeof user.profile.roles == 'undefined') {
      user.profile.roles = []
    }
    user._username = user.profile.login.split('@').shift()
    user.anonymous = false
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
