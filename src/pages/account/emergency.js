import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/header/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid'
import { UserContext } from 'components/contexts/user'
import { Button } from 'components/button'
import Loading from 'components/loading'
import { InputText, Submit } from 'components/forms'
import {
  AccountGroup,
  AccountTitle,
  AccountData,
  AccountSidebar,
} from 'components/pages/account'
import Link from 'gatsby-link'
import { AlertDanger, AlertSuccess } from 'components/alert'
import phoneFormatter from 'phone-formatter'

class UserEmergencyForm extends React.Component {
  state = {
    everbridgeUser: false,
    error: false,
    userToken: false,
    isReady: false,
    showForm: false,
  }

  componentDidMount() {
    fetch(`https://csumb.okta.com/api/v1/sessions/me`, {
      credentials: 'include',
    })
      .then(response => {
        return response.json()
      })
      .then(session => {
        const time = new Date()
        fetch(
          `https://api.csumb.edu/everbridge/get?token=${
            session.id
          }&_t=${time.getTime()}`
        )
          .then(response => {
            return response.json()
          })
          .then(everbridgeUser => {
            this.setState({
              everbridgeUser: everbridgeUser,
              userToken: session.id,
              isReady: true,
            })
          })
          .catch(error => {
            this.setState({
              error: true,
              isReady: true,
            })
          })
      })
      .catch(error => {
        this.setState({
          error: true,
          isReady: true,
        })
      })
  }

  handleShowForm(event) {
    event.preventDefault()
    this.setState({
      showForm: !this.state.showForm,
    })
  }

  render() {
    const { isReady, everbridgeUser, error, showForm, userToken } = this.state

    return (
      <AccountGroup legend="Text messages">
        {isReady ? (
          <>
            {error || everbridgeUser.error ? (
              <AlertDanger>
                We could not find your emergency information.
              </AlertDanger>
            ) : (
              <>
                <p>
                  This phone number will receive text messages when there is a
                  campus emergency.
                </p>

                {everbridgeUser.user.paths.map(path => (
                  <>
                    {path.pathId === 241901148045324 && (
                      <AccountData key={path.pathId}>
                        {phoneFormatter.format(path.value, '(NNN) NNN-NNNN')}
                      </AccountData>
                    )}
                  </>
                ))}
                <p>
                  <Button onClick={this.handleShowForm.bind(this)}>
                    Edit phone number
                  </Button>
                </p>
                {showForm && <UserEmergencyPhoneForm token={userToken} />}
              </>
            )}
          </>
        ) : (
          <Loading>Loading your emergency information</Loading>
        )}
      </AccountGroup>
    )
  }
}

class UserEmergencyPhoneForm extends React.Component {
  state = {
    success: false,
    number: false,
  }

  handleNumberChange(event) {
    this.setState({
      number: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const phone = phoneFormatter.normalize(this.state.number)
    fetch(
      `https://api.csumb.edu/everbridge/phone?token=${
        this.props.token
      }&phone=${phone}`
    )
      .then(response => {
        return response.json()
      })
      .then(result => {
        this.setState({
          success: true,
        })
      })
  }

  render() {
    const { success } = this.state
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <InputText
          onKeyUp={this.handleNumberChange.bind(this)}
          label="New phone number"
          name="phone"
          small
        />
        <Submit value="Change number" />
        {success && (
          <AlertSuccess>
            Your emergency phone number has been changed.
          </AlertSuccess>
        )}
      </form>
    )
  }
}

class AccountEmergencyPage extends React.Component {
  render() {
    return (
      <Layout pageTitle="Your profile">
        <UserContext.Consumer>
          {context => (
            <>
              {context.user && (
                <Container>
                  <PageTitle>
                    {context.user.anonymous ? (
                      <h3>Your account</h3>
                    ) : (
                      <>
                        {context.user.profile.firstName}{' '}
                        {context.user.profile.lastName}
                      </>
                    )}
                  </PageTitle>
                  <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                      <AccountSidebar active="account" user={context.user} />
                    </Box>
                    <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                      {context.user.anonymous ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <AccountTitle>Emergency alerts</AccountTitle>
                          <p>
                            <Link to="/otteralerts">OTTERAlerts</Link> is
                            CSUMB's emergency notification system. It delivers
                            time-sensitive emergency notifications via email,
                            text-messaging and outdoor warning sirens to all
                            members of the CSUMB community.
                          </p>
                          <UserEmergencyForm user={context.user} />
                        </>
                      )}
                    </Box>
                  </Flex>
                </Container>
              )}
            </>
          )}
        </UserContext.Consumer>
      </Layout>
    )
  }
}

export default AccountEmergencyPage
