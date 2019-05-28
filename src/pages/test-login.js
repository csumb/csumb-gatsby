import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/common/container'
import Well from 'components/common/well'

class TestLoginPage extends Component {
  state = {
    user: false,
    anonymous: false,
    isReady: false,
  }

  componentDidMount() {
    fetch('https://csumb.okta.com/api/v1/users/me', {
      credentials: 'include',
      cache: 'no-store',
    })
      .then(response => {
        return response.json()
      })
      .then(user => {
        this.setState({
          user: user,
          isReady: true,
        })
      })
      .catch(err => {
        this.setState({
          anonymous: true,
          isReady: true,
        })
      })
  }
  render() {
    const { isReady, user, anonymous } = this.state
    return (
      <Layout pageTitle="Test login">
        <Container>
          <h1>Well, this is embarassing</h1>
          <p>
            We're having issues logging some users in, want to test something.
          </p>
          <Well>
            {isReady ? (
              <>
                {anonymous ? (
                  <>
                    <h1>Not logged in</h1>
                    <p>...or there is an issue</p>
                    <p>
                      <a href="https://csumb.okta.com/home/csumb_csumbbetawebsite_1/0oalhdw605Fe37hnQ0x7/alnlhdyx6zseWNBdS0x7">
                        Login here
                      </a>
                      (it will redirect you to the csumb dashboard, that's
                      fine), then come back to this page, and it should work.
                    </p>
                  </>
                ) : (
                  <>
                    <h1>Logged in!</h1>
                    <p>Hi, {user.profile.firstName}!</p>
                  </>
                )}
              </>
            ) : (
              <h1>Loading...</h1>
            )}
          </Well>
        </Container>
      </Layout>
    )
  }
}

export default TestLoginPage
