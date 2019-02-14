import React from 'react'
import Plain from 'components/layouts/plain'
import url from 'url'

class PertsPage extends React.Component {
  state = {
    loginNeeded: false,
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
        let location = url.parse(window.location.href, true)
        window.location = `https://neptune.perts.net/participate/portal/${
          location.query.code
        }/${location.query.session}/${user.profile.login.split('@').shift()}`
      })
      .catch(error => {
        this.setState({
          loginNeeded: true,
        })
      })
  }

  render() {
    return (
      <Plain>
        <h1>Redirecting you to Perts</h1>
      </Plain>
    )
  }
}

export default PertsPage
