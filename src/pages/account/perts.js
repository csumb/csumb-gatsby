import React, { Component } from 'react'
import Brand from 'components/layouts/sections/header/brand'
import url from 'url'
import PlainLayout from 'components/layouts/plain'
import PageTitle from 'components/layouts/sections/header/page-title'
import { graphql } from 'gatsby'

class PertsPage extends Component {
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
        }/${location.query.session}/${user._username}`
      })
      .catch(error => {
        this.setState({
          loginNeeded: true,
        })
      })
  }

  render() {
    const { data } = this.props
    return (
      <PlainLayout>
        <Container>
          <Brand style={{ maxWidth: '350px' }} />
          <PageTitle>Perts</PageTitle>

          {this.state.loginNeeded ? (
            <>
              <h2>You must be logged in first</h2>
              <a href={data.site.siteMetadata.okta.login}>
                Log in to your dashboard, and return to this page
              </a>
            </>
          ) : (
            <h2>Logging you into PERTS.</h2>
          )}
        </Container>
      </PlainLayout>
    )
  }
}

export default PertsPage

export const query = graphql`
  {
    site {
      siteMetadata {
        okta {
          login
        }
      }
    }
  }
`
