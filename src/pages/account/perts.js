import React, { Component } from 'react'
import Brand from 'components/layouts/sections/header/brand'
import url from 'url'
import PlainLayout from 'components/layouts/plain'
import PageTitle from 'components/layouts/sections/header/page-title'
import { graphql } from 'gatsby'
import Container from 'components/common/container'
import { UserContext } from 'components/contexts/user'

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

  render() {
    return <></>
  }
}

const PertsPage = ({ data }) => (
  <PlainLayout>
    <Container>
      <Brand style={{ maxWidth: '350px' }} />
      <PageTitle>Perts</PageTitle>
      <UserContext.Consumer>
        {context => (
          <>
            {context.user ? (
              <>
                <h2>Logging you into PERTS.</h2>
                <PertsRedirect user={context.user} />
              </>
            ) : (
              <>
                <h2>You must be logged in first</h2>
                <a href={data.site.siteMetadata.okta.login}>
                  Log in to your dashboard, and return to this page
                </a>
              </>
            )}
          </>
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
