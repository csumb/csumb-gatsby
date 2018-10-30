import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import User from 'components/user'
import Link from 'gatsby-link'
import {
  AccountGroup,
  AccountTitle,
  AccountData,
  AccountSidebar,
} from 'components/account'
import Button from 'components/button'

class AccountPage extends React.Component {
  render() {
    return (
      <User>
        {user => (
          <>
            {user && (
              <Layout pageTitle="Your profile">
                <Container>
                  <PageTitle>
                    {user === 'anonymous' ? (
                      <h3>Your account</h3>
                    ) : (
                      <>
                        {user.profile.firstName} {user.profile.lastName}
                      </>
                    )}
                  </PageTitle>
                  <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                      <AccountSidebar active="account" />
                    </Box>
                    <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                      {user === 'anonymous' ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <AccountTitle>Your account</AccountTitle>
                          <UserAccountForm user={user} />
                        </>
                      )}
                    </Box>
                  </Flex>
                </Container>
              </Layout>
            )}
          </>
        )}
      </User>
    )
  }
}

class UserAccountForm extends React.Component {
  render() {
    const user = this.props.user
    return (
      <>
        <AccountGroup legend="Username &amp; password">
          <p>
            Your username and password are used in every online service on
            campus, including logging into computers.
          </p>
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
              <h3>Username</h3>
              <p>Your CSUMB username is:</p>
              <AccountData>{user.profile.login.split('@').shift()}</AccountData>
              <p>You cannot change your CSUMB username.</p>
            </Box>
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
              <h3>Password</h3>
              <Button
                to="https://csumb.okta.com/enduser/settings"
                buttonType="primary"
              >
                Change your password
              </Button>
            </Box>
          </Flex>
        </AccountGroup>
        <AccountGroup legend="Name">
          <p>Your name is:</p>
          <AccountData>
            {user.profile.firstName} {user.profile.lastName}
          </AccountData>
          <p>
            <strong>Changing your name:</strong> You may have many names: a
            legal name, a nick name, or a preferred name.{' '}
            <Link to="/account/help/change-name">
              Learn how to change your name.
            </Link>
          </p>
        </AccountGroup>
        <AccountGroup legend="Email">
          {user.profile.email.search('@csumb.edu') > -1 ? (
            <>
              <p>You have an official CSUMB email address: </p>
              <AccountData>{user.profile.email}</AccountData>
              <p>
                <strong>Changing your email:</strong> You can change your email
                address by filing a ticket with IT.
              </p>
            </>
          ) : (
            <>
              <p>
                You do not have an official CSUMB email address. The email
                address we have on file is:
              </p>

              <AccountData>{user.profile.email}</AccountData>
            </>
          )}
        </AccountGroup>
        <AccountGroup legend="Secondary email">
          <p>
            Your secondary email is used in case you forget your CSUMB password
            or cannot get into your account.
          </p>
          {user.profile.secondEmail ? (
            <>
              <p>Your secondary email is: </p>
              <AccountData>{user.profile.secondEmail}</AccountData>
              <Button to="https://csumb.okta.com/settings" buttonType="primary">
                Change your secondary email
              </Button>
            </>
          ) : (
            <>
              <p>
                You do not have a secondary email set up. You should setup one
                now to make sure you are never locked out of your account.
              </p>
              <Button to="https://csumb.okta.com/settings" buttonType="primary">
                Setup your secondary email
              </Button>
            </>
          )}
        </AccountGroup>
        <AccountGroup legend="Employee or student number">
          <p>Your employee or student number is:</p>
          <AccountData>{user.profile.employeeNumber}</AccountData>
          <p>This is used on some forms around campus.</p>
        </AccountGroup>
      </>
    )
  }
}

export default AccountPage
