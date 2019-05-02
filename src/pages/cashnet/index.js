import React from 'react'
import PlainLayout from 'components/layouts/plain'
import PageTitle from 'components/layouts/sections/header/page-title'
import { LeadParagraph } from 'components/common/type'
import styled from '@emotion/styled'
import url from 'url'

import Brand from 'components/layouts/sections/header/brand'

const loginAddress =
  'https://csumb.okta.com/app/csumb_csumbcashnet_1/exkm6j1xciOYxrGdu0x7/sso/saml'

const CashnetContainer = styled('div')`
  max-width: 60ch;
  margin: 3rem auto;
`

class CashnetPage extends React.Component {
  state = {
    user: false,
  }
  componentDidMount() {
    if (typeof window === 'undefined') {
      return
    }

    let location = url.parse(window.location.href, true)
    const category =
      typeof location.query !== 'undefined' &&
      typeof location.query.category !== 'undefined'
        ? `/${location.query.category}`
        : ''
    fetch('https://csumb.okta.com/api/v1/users/me', {
      credentials: 'include',
    })
      .then(response => {
        return response.json()
      })
      .then(user => {
        window.location = `https://api.csumb.edu/cashnet/${
          user.profile.employeeNumber
        }${category}`
      })
      .catch(error => {
        this.setState({
          user: 'anonymous',
        })
        window.location.href = loginAddress
      })
  }
  render() {
    return (
      <PlainLayout>
        <CashnetContainer>
          <Brand style={{ maxWidth: '350px' }} />
          <PageTitle>CashNET</PageTitle>

          {this.state.user === 'anonymous' ? (
            <LeadParagraph>You must be logged in</LeadParagraph>
          ) : (
            <LeadParagraph>We are redirecting you to CashNet...</LeadParagraph>
          )}
        </CashnetContainer>
      </PlainLayout>
    )
  }
}

export default CashnetPage
