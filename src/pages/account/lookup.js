import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/header/page-title'
import Container from 'components/container'
import { InputText, InputDate, Submit } from 'components/forms'
import { LeadParagraph } from 'components/type'
import Well from 'components/well'
import styled from 'react-emotion'

const Username = styled('code')`
  font-weight: bold;
  font-size: 1.4rem;
  display: inline-block;
  margin-left: 1rem;
`

class LookupForm extends React.Component {

  state = {
    firstName: false,
    lastName: false,
    dob: false,
    user: false
  }

  handleChangeFirstName(event) {
    this.setState({
      firstName: event.target.value
    })
  }

  handleChangeLastName(event) {
    this.setState({
      lastName: event.target.value
    })
  }

  handleChangeDob(event) {
    this.setState({
      dob: event.target.value
    })
  }

  handleSubmit(event) {
    const { firstName, lastName, dob } = this.state
    event.preventDefault()
    fetch(`https://api.csumb.edu/okta/lookup?firstName=${firstName}&lastName=${lastName}&dob=${dob}`).then(response => {
      return response.json()
    }).then(user => {
      this.setState({
        user: user
      })
    })
  }

  render() {
    const { user } = this.state
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <InputText name="first" label="First name" onChange={this.handleChangeFirstName.bind(this)} />
        <InputText name="last" label="Last name" onChange={this.handleChangeLastName.bind(this)} />
        <InputDate name="dob" label="Date of birth" onChange={this.handleChangeDob.bind(this)} />
        <Submit value="Lookup username" />
        {user && user.id && (
          <LeadParagraph>Your username is: <Username>{user.id}</Username></LeadParagraph>
        )}
      </form>
    )
  }
}


const LookupPage = () => (
  <Layout PageTitle="Lookup username">
    <Container topPadding>
      <PageTitle>Lookup username</PageTitle><Well>
        <LookupForm />
      </Well>
    </Container>
  </Layout>
)

export default LookupPage