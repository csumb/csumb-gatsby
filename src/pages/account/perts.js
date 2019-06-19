import React, { Component } from 'react'
import Brand from '../../components/layouts/sections/header/brand'
import url from 'url'
import PlainLayout from '../../components/layouts/plain'
import { PageTitle } from '../../components/layouts/default'
import { graphql } from 'gatsby'
import Container from '../../components/common/container'
import { UserContext } from '../../components/contexts/user'
import Loading from '../../components/common/loading'

class PertsRedirect extends Component {
  componentDidMount() {
    if (typeof window === 'undefined') {
      return
    }
    let location = url.parse(window.location.href, true)
    window.location = `https://neptune.perts.net/participate/portal/${
      location.query.code
    }/${location.query.session}/${this.props.user._username}`
  }

  componentDidUpdate() {
    const { loginUrl, user } = this.props
    if (typeof window === 'undefined' || !user) {
      return
    }

    let location = url.parse(window.location.href, true)

    if (this.props.user.anonymous) {
      window.location = `${loginUrl}?RelayState=${encodeURIComponent(
        `/account/perts?code=${location.query.code}&session=${
          location.query.session
        }`
      )}`
      return
    }
    window.location = `https://neptune.perts.net/participate/portal/${
      location.query.code
    }/${location.query.session}/${user._username}`
  }

  render() {
    return <Loading>Logging you into PERTS</Loading>
  }
}

const PertsPage = ({ data }) => (
  <PlainLayout>
    <Container>
      <Brand style={{ maxWidth: '350px' }} />
      <PageTitle>Perts</PageTitle>
      <UserContext.Consumer>
        {context => (
          <PertsRedirect
            loginUrl={data.site.siteMetadata.okta.login}
            user={context.user}
          />
        )}
      </UserContext.Consumer>
    </Container>
  </PlainLayout>
)

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
