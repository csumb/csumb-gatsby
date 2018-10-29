import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import Link from 'gatsby-link'
import {
  ProfileGroup,
  ProfileTitle,
  ProfileData,
  ProfileSidebar,
} from 'components/profile'
import Button from 'components/button'

class ProfilePage extends React.Component {
  state = {
    user: false,
  }

  componentDidMount() {
    window
      .fetch('https://csumb.okta.com/api/v1/users/me', {
        credentials: 'include',
      })
      .then(response => {
        return response.json()
      })
      .then(user => {
        this.setState({
          user: user,
        })
      })
      .catch(error => {
        this.setState({
          user: 'anonymous',
        })
      })
  }

  render() {
    if (!this.state.user) {
      return null
    }
    return (
      <Layout pageTitle="Your profile">
        <Container>
          <PageTitle>
            {this.state.user === 'anonymous' ? (
              <h3>Your profile</h3>
            ) : (
              <>
                {this.state.user.profile.firstName}{' '}
                {this.state.user.profile.lastName}
              </>
            )}
          </PageTitle>
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
              <ProfileSidebar active="profile" />
            </Box>
            <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
              {this.state.user === 'anonymous' ? (
                <h3>You must be logged in first.</h3>
              ) : (
                <>
                  <ProfileTitle>Your profile</ProfileTitle>
                  <UserProfileForm user={this.state.user} />
                </>
              )}
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

class UserProfileForm extends React.Component {
  render() {
    const user = this.props.user
    return (
      <>
        <ProfileGroup legend="Name">
          <p>Your name is:</p>
          <ProfileData>
            {user.profile.firstName} {user.profile.lastName}
          </ProfileData>
          <p>
            <strong>Changing your name:</strong> You may have many names: a
            legal name, a nick name, or a preferred name.{' '}
            <Link to="/profile/help/change-name">
              Learn how to change your name.
            </Link>
          </p>
        </ProfileGroup>
        <ProfileGroup legend="Email">
          {user.profile.email.search('@csumb.edu') > -1 ? (
            <>
              <p>You have an official CSUMB email address: </p>
              <ProfileData>{user.profile.email}</ProfileData>
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

              <ProfileData>{user.profile.email}</ProfileData>
            </>
          )}
        </ProfileGroup>
        <ProfileGroup legend="Secondary email">
          <p>
            Your secondary email is used in case you forget your CSUMB password
            or cannot get into your account.
          </p>
          {user.profile.secondEmail ? (
            <>
              <p>Your secondary email is: </p>
              <ProfileData>{user.profile.secondEmail}</ProfileData>
              <p>
                <strong>Changing your secondary email: </strong>
              </p>
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
        </ProfileGroup>
        <ProfileGroup legend="Username &amp; password">
          <p>
            Your username and password are used in every online service on
            campus, including logging into computers.
          </p>
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
              <h3>Username</h3>
              <p>Your CSUMB username is:</p>
              <ProfileData>{user.profile.login.split('@').shift()}</ProfileData>
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
        </ProfileGroup>
      </>
    )
  }
}

export default ProfilePage
