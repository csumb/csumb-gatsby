import React, { Component } from 'react'
import styled from '@emotion/styled'
import url from 'url'
import PlainLayout from '../../components/layouts/plain'
import { PageTitle } from '../../components/layouts/default'
import { LeadParagraph } from '../../components/common/type'
import Brand from '../../components/layouts/sections/header/brand'
import { UserContext } from '../../components/contexts/user'
import { graphql } from 'gatsby'

const CashnetContainer = styled.div`
  max-width: 60ch;
  margin: 3rem auto;
`

class CashnetRedirect extends Component {
  componentDidUpdate() {
    const { loginUrl, user } = this.props
    if (typeof window === 'undefined' || !user) {
      return
    }

    let location = url.parse(window.location.href, true)
    const category =
      typeof location.query !== 'undefined' &&
      typeof location.query.category !== 'undefined'
        ? `/${location.query.category}`
        : ''

    if (this.props.user.anonymous) {
      window.location = `${loginUrl}?RelayState=${encodeURIComponent(
        `/cashnet${
          typeof location.query !== 'undefined' &&
          typeof location.query.category !== 'undefined'
            ? `?category=${location.query.category}`
            : ''
        }`
      )}`
    }
    window.location = `https://api.csumb.edu/cashnet/${
      user.profile.employeeNumber
    }${category}`
  }

  render() {
    return (
      <>
        {!this.props.user || this.props.user.anonymous ? (
          <LeadParagraph>You must be logged in</LeadParagraph>
        ) : (
          <LeadParagraph>We are redirecting you to CashNet...</LeadParagraph>
        )}
      </>
    )
  }
}

const CashnetPage = ({ data }) => (
  <PlainLayout>
    <CashnetContainer>
      <Brand style={{ maxWidth: '350px' }} />
      <PageTitle>CashNET</PageTitle>
      <UserContext.Consumer>
        {context => (
          <CashnetRedirect
            loginUrl={data.site.siteMetadata.okta.login}
            user={context.user}
          />
        )}
      </UserContext.Consumer>
    </CashnetContainer>
  </PlainLayout>
)

export default CashnetPage

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
