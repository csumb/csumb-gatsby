import React from 'react'
import { UserContext } from 'components/contexts/user'
import BreakpointContext from 'components/contexts/breakpoint'

class UserComponent extends React.Component {
  render() {
    return (
      <BreakpointContext.Provider
        value={{ width: 900, height: 900, isMobile: false }}
      >
        <UserContext.Provider value={{ user: false }}>
          {this.props.children}
        </UserContext.Provider>
      </BreakpointContext.Provider>
    )
  }
}

export const wrapPageElement = ({ element, props }) => {
  return <UserComponent {...props}>{element}</UserComponent>
}
