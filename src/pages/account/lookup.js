import React, { Component } from 'react'
import { Layout, PageTitle, SiteHeader, SiteNavigation } from 'components/layouts/default'
import Container from 'components/common/container'
import { Flex, Box } from 'components/common/grid'
import { InputText, InputDate, Submit } from 'components/common/forms'
import { LeadParagraph } from 'components/common/type'
import Well from 'components/common/well'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import Loading from 'components/common/loading'
import { AlertDanger } from 'components/common/alert'

const Username = styled.span`
  font-weight: bold;
  font-size: 1.4rem;
  display: inline-block;
`

const UsernameAlert = styled(AlertDanger)`
  margin-top: 0;
`

const SubmitFlex = styled(Flex)`
  margin-top: 1.5rem;
`

class LookupForm extends Component {
  state = {
    firstName: false,
    lastName: false,
    dob: false,
    user: false,
    isLoading: false,
  }

  handleChangeFirstName(event) {
    this.setState({
      firstName: event.target.value,
    })
  }

  handleChangeLastName(event) {
    this.setState({
      lastName: event.target.value,
    })
  }

  handleChangeDob(event) {
    this.setState({
      dob: event.target.value,
    })
  }

  handleSubmit(event) {
    this.setState({
      isLoading: true,
    })
    const { firstName, lastName, dob } = this.state
    event.preventDefault()
    fetch(
      `/cloud-functions/okta/lookup?firstName=${firstName}&lastName=${lastName}&dob=${dob}`
    )
      .then(response => {
        return response.json()
      })
      .then(user => {
        this.setState({
          user: user,
          isLoading: false,
        })
      })
  }

  render() {
    const { isLoading, user } = this.state
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <InputText
          name="first"
          label="First name"
          onChange={this.handleChangeFirstName.bind(this)}
        />
        <InputText
          name="last"
          label="Last name"
          onChange={this.handleChangeLastName.bind(this)}
        />
        <InputDate
          name="dob"
          label="Date of birth"
          onChange={this.handleChangeDob.bind(this)}
        />
        <SubmitFlex>
          <Box width={[1, 1 / 3]} pr={[0, 2]}>
            <Submit value="Lookup username" nomargin />
          </Box>
          <Box width={[1, 2 / 3]}>
            {isLoading && <Loading>Looking up username</Loading>}
            {user && user.id && (
              <LeadParagraph>
                Your username is: <Username>{user.id}</Username>
              </LeadParagraph>
            )}
            {user && !user.id && (
              <>
                <UsernameAlert>We could not find your username.</UsernameAlert>
                <p>
                  <strong>Need help?</strong> Give us a call at 831-582-4357
                  (HELP)
                </p>
              </>
            )}
          </Box>
        </SubmitFlex>
      </form>
    )
  }
}

const LookupPage = () => (
  <Layout PageTitle="Lookup username">
    <Container topPadding>
      <PageTitle>Lookup username</PageTitle>
      <LeadParagraph>
        Your <Link to="/it/accounts-and-passwords">CSUMB account</Link> is used
        to log into every app on campus.
      </LeadParagraph>
      <Well>
        <LookupForm />
      </Well>
    </Container>
  </Layout>
)

export default LookupPage
