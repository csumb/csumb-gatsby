import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/header/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import { UserContext } from 'components/contexts/user'
import { Button } from 'components/button'
import Link from 'gatsby-link'
import Loading from 'components/loading'
import {
  AccountGroup,
  AccountTitle,
  AccountData,
  AccountSidebar,
} from 'components/pages/account'
import { ButtonLink } from 'components/button'
import { AlertDanger } from '../../components/alert'

const paths = {
  241901148045316: 'Email address',
  241901148045324: 'Text messages',
}

class UserEmergencyForm extends React.Component {
  state = {
    everbridgeUser: false,
    error: false,
    isReady: false,
  }

  componentDidMount() {
    fetch(`https://csumb.okta.com/api/v1/sessions/me`, {
      credentials: 'include',
    })
      .then(response => {
        return response.json()
      })
      .then(session => {
        fetch(`https://api.csumb.edu/everbridge/get?token=${session.id}`)
          .then(response => {
            return response.json()
          })
          .then(everbridgeUser => {
            this.setState({
              everbridgeUser: everbridgeUser,
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

  render() {
    const { isReady, everbridgeUser, error } = this.state
    return (
      <AccountGroup legend="Phone number &amp; text messages">
        {isReady ? (
          <>
            {error || everbridgeUser.error ? (
              <AlertDanger>
                We could not find your emergency information.
              </AlertDanger>
            ) : (
              <>
                {everbridgeUser.user.paths.map(path => (
                  <p key={path.pathId}>
                    {paths[path.pathId]} : {path.value}
                  </p>
                ))}
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
