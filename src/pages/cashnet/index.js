import React, { Component } from 'react'
import PlainLayout from 'components/layouts/plain'
import PageTitle from 'components/layouts/sections/header/page-title'
import { LeadParagraph } from 'components/common/type'
import styled from '@emotion/styled'
import url from 'url'
import Brand from 'components/layouts/sections/header/brand'
import { UserContext } from 'components/contexts/user'

const CashnetContainer = styled.div`
  max-width: 60ch;
  margin: 3rem auto;
`

class CashnetRedirect extends Component {
  componentDidMount() {
    if (typeof window === 'undefined' || !this.props.user) {
      return
    }

    let location = url.parse(window.location.href, true)
    const category =
      typeof location.query !== 'undefined' &&
      typeof location.query.category !== 'undefined'
        ? `/${location.query.category}`
        : ''

    window.location = `https://api.csumb.edu/cashnet/${
      this.props.user.profile.employeeNumber
    }${category}`
  }

  render() {
    return (
      <>
        {!this.props.user === 'anonymous' ? (
          <LeadParagraph>You must be logged in</LeadParagraph>
        ) : (
          <LeadParagraph>We are redirecting you to CashNet...</LeadParagraph>
        )}
      </>
    )
  }
}

class CashnetPage extends Component {
  render() {
    return (
      <PlainLayout>
        <CashnetContainer>
          <Brand style={{ maxWidth: '350px' }} />
          <PageTitle>CashNET</PageTitle>
          <UserContext.Consumer>
            {context => <CashnetRedirect user={context.user} />}
          </UserContext.Consumer>
        </CashnetContainer>
      </PlainLayout>
    )
  }
}

export default CashnetPage
