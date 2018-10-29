import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import Link from 'gatsby-link'
import styled from 'react-emotion'
import theme from 'components/styles/theme'
import { InputText, Fieldset } from 'components/forms'

const ProfileSidebarOptions = styled('ul')`
  list-style-type: none;
  margin: 0;
`

const ProfileSidebarLink = styled(Link)`
  display: block;
  padding: 0.5rem;
  border-bottom: 1px solid ${theme.colors.black};
  ${props =>
    props.active
      ? `background: ${theme.colors.primary.dark};
    color: ${theme.colors.white};`
      : `color: ${theme.colors.primary.dark};`};
`

const UserProfileTitle = styled('h2')`
  margin-top: 0;
`

const UserProfileData = styled('p')`
  font-size: 1.4rem;
  font-weight: bold;
  margin-left: 1rem;
`

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
              <ProfileSidebarOptions>
                <ProfileSidebarLink to="/profile" active>
                  Your profile
                </ProfileSidebarLink>
                <ProfileSidebarLink to="/profile/print">
                  Printer paper
                </ProfileSidebarLink>
                <ProfileSidebarLink to="/profile/ottercard">
                  Otter Card
                </ProfileSidebarLink>
              </ProfileSidebarOptions>
            </Box>
            <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
              {this.state.user === 'anonymous' ? (
                <h3>You must be logged in first.</h3>
              ) : (
                <>
                  <UserProfileTitle>Your profile</UserProfileTitle>
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
  onSubmit(event) {
    event.preventDefault()
  }

  render() {
    const user = this.props.user
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <Fieldset legend="Your name">
          <p>Your name is:</p>
          <UserProfileData>
            {user.profile.firstName} {user.profile.lastName}
          </UserProfileData>
          <p>
            You may have many names: a legal name, a nick name, or a preferred
            name.{' '}
            <Link to="/profile/help/change-name">
              Learn how to change your name.
            </Link>
          </p>
        </Fieldset>
      </form>
    )
  }
}

export default ProfilePage
