import React from 'react'
import PropTypes from 'prop-types'

class User extends React.Component {
  state = {
    user: false,
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
    const { children } = this.props
    return <>{children(this.state.user)}</>
  }
}

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export default User
