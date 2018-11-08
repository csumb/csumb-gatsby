import React from 'react'
import { UserContext } from 'components/contexts/user'

class CashnetPage extends React.Component {
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
        window.location = `https://api.csumb.edu/cashnet/${
          user.profile.employeeNumber
        }/RMBRD`
      })
      .catch(error => {
        this.setState({
          user: 'anonymous',
        })
      })
  }
  render() {
    return (
      <>
        {this.state.user === 'anonymous' ? (
          <h1>You must be logged in</h1>
        ) : (
          <h1>One sec, we're redirecting you to CashNet...</h1>
        )}
      </>
    )
  }
}

export default CashnetPage
