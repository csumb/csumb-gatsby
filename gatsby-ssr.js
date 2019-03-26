import React from 'react'
import { UserContext } from 'components/contexts/user'

class UserComponent extends React.Component {
  render() {
    return (
      <UserContext.Provider value={{ user: false }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export const wrapPageElement = ({ element, props }) => {
  return <UserComponent {...props}>{element}</UserComponent>
}
