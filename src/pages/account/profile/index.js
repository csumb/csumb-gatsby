import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import User from 'components/user'
import Link from 'gatsby-link'
import styled from 'react-emotion'
import ReactFilestack from 'filestack-react'
import theme from 'components/styles/theme'
import { css } from 'emotion'
import { InputText, InputSubmit } from 'components/forms'
import {
  AccountGroup,
  AccountTitle,
  AccountData,
  AccountSidebar,
} from 'components/account'
import Button from 'components/button'

const AccountPhoto = styled('img')`
  max-width: 150px;
`
class AccountProfilePage extends React.Component {
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
                      <h3>Your profile</h3>
                    ) : (
                      <>
                        {user.profile.firstName} {user.profile.lastName}
                      </>
                    )}
                  </PageTitle>
                  <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                      <AccountSidebar active="profile" user={user} />
                    </Box>
                    <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                      {user === 'anonymous' ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <AccountTitle>Your public profile</AccountTitle>
                          <UserAccountProfileForm user={user} />
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

class UserAccountProfileForm extends React.Component {
  render() {
    const { user } = this.props
    return (
      <>
        <AccountGroup legend="Job title">
          <p>
            Your job titles are shown on the{' '}
            <Link to="/directory">public campus directory.</Link>
          </p>
          {user.profile.directoryTitle.map((title, index) => (
            <AccountData key={index}>
              {title}
              <br />
              <em>{user.profile.directoryDepartment[index]}</em>
            </AccountData>
          ))}
          <p>
            <strong>Changing your job title:</strong> Your department and job
            title are controled by your human resources department.
          </p>
        </AccountGroup>
        <AccountGroup legend="Office location">
          <p>
            Your office location is shown on the{' '}
            <Link to="/directory">public campus directory.</Link>
          </p>
          <AccountData>
            {user.profile.directoryBuilding}
            <br />
            {user.profile.campusRoomNumber.length && (
              <em>Room {user.profile.campusRoomNumber}</em>
            )}
          </AccountData>
          <p>
            <Button to="/account/profile/change/office">
              Change office location
            </Button>
          </p>
        </AccountGroup>
        <UserAccountprofilePhone user={user} />
        <UserAccountProfilePhoto user={user} />
      </>
    )
  }
}

class UserAccountprofilePhone extends React.Component {
  state = {
    showForm: false,
  }

  handleShowForm(event) {
    event.preventDefault()
    this.setState({
      showForm: !this.state.showForm,
    })
  }

  render() {
    const { user } = this.props
    return (
      <AccountGroup legend="Phone number">
        <p>
          Your phone number is shown on the{' '}
          <Link to="/directory">public campus directory.</Link>
        </p>
        <AccountData>{user.profile.directoryPhone}</AccountData>
        <p>
          <Button onClick={this.handleShowForm.bind(this)} to="#phone">
            Change phone number
          </Button>
        </p>
        {this.state.showForm && (
          <form>
            <InputText label="Phone number" />
            <InputSubmit value="Update phone" />
          </form>
        )}
      </AccountGroup>
    )
  }
}

class UserAccountProfilePhoto extends React.Component {
  savePhoto(photo) {}

  render() {
    const { user } = this.props
    return (
      <AccountGroup legend="Profile photo">
        <p>
          This photo is shown on the{' '}
          <Link to="/directory">public campus directory.</Link>
        </p>
        {user.profile.directoryPhoto && (
          <AccountData>
            <AccountPhoto
              src={user.profile.directoryPhoto}
              alt="Your profile"
            />
          </AccountData>
        )}
        <ReactFilestack
          apikey="A3ttdsdUR8aGvjvUnJBWUz"
          onSuccess={this.savePhoto}
          options={{
            accept: 'image/*',
            maxFiles: 1,
            storeTo: {
              location: 's3',
            },
          }}
          render={({ onPick }) => (
            <div>
              <button
                onClick={onPick}
                className={css`
                  padding: 1rem;
                  display: inline-block;
                  text-decoration: none;
                  cursor: pointer;
                  &:hover {
                    color: ${theme.colors.white};
                  }
                  color: ${theme.colors.primary.dark};
                  border: 3px solid ${theme.colors.primary.dark};
                  &:hover {
                    background: ${theme.colors.primary.dark};
                  }
                `}
              >
                Change profile photo
              </button>
            </div>
          )}
        />
      </AccountGroup>
    )
  }
}

export default AccountProfilePage
