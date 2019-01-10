import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/header/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import { UserContext } from 'components/contexts/user'
import Link from 'gatsby-link'
import styled from 'react-emotion'
import ReactFilestack from 'filestack-react'
import { InputText, InputSelect, Submit } from 'components/forms'
import { graphql } from 'gatsby'
import { AlertSuccess } from 'components/alert'
import {
  AccountGroup,
  AccountTitle,
  AccountData,
  AccountSidebar,
} from 'components/pages/account'
import { Button } from 'components/button'
import SimpleMDE from 'react-simplemde-editor'
import 'simplemde/dist/simplemde.min.css'

const AccountPhoto = styled('img')`
  max-width: 150px;
`

const updateOktaField = (user, field, value) => {
  fetch(
    `https://api.csumb.edu/okta/profile?user=${user.id}&token=${
      user.profile.authToken
    }&field=${field}&value=${value}`
  )
}
class AccountProfilePage extends React.Component {
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
                      <h3>Your profile</h3>
                    ) : (
                      <>
                        {context.user.profile.firstName}{' '}
                        {context.user.profile.lastName}
                      </>
                    )}
                  </PageTitle>
                  <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                      <AccountSidebar active="profile" user={context.user} />
                    </Box>
                    <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                      {context.user.anonymous ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <AccountTitle>Your public profile</AccountTitle>
                          <UserAccountProfileForm
                            user={context.user}
                            buildings={this.props.data.allCsumbBuilding.edges}
                          />
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

class UserAccountProfileForm extends React.Component {
  render() {
    const { user, buildings } = this.props
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
        <UserAccountProfileOffice user={user} buildings={buildings} />
        <UserAccountProfilePhone user={user} />
        <UserAccountProfileBio user={user} />
        <UserAccountProfilePhoto user={user} />
      </>
    )
  }
}

class UserAccountProfileOffice extends React.Component {
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
    const { user, buildings } = this.props
    return (
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
          <Button onClick={this.handleShowForm.bind(this)}>
            Change office location
          </Button>
        </p>
        {this.state.showForm && (
          <UserAccountProfileOfficeForm buildings={buildings} user={user} />
        )}
      </AccountGroup>
    )
  }
}

class UserAccountProfileOfficeForm extends React.Component {
  state = {
    building: false,
    room: false,
    updated: false,
  }
  handleSubmit(event) {
    const { user } = this.props
    event.preventDefault()
    updateOktaField(user, 'directoryBuildingCode', this.state.building)
    updateOktaField(user, 'campusRoomNumber', this.state.room)
    this.setState({
      updated: true,
    })
  }
  handleRoomChange(event) {
    this.setState({
      room: event.target.value,
    })
  }
  handleBuildingChange(event) {
    this.setState({
      building: event.value,
    })
  }
  render() {
    const { buildings, user } = this.props
    const buildingOptions = []
    buildings.forEach(building => {
      buildingOptions.push({
        value: building.node.code,
        label: building.node.buildingName,
      })
    })
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <InputSelect
          onChange={this.handleBuildingChange.bind(this)}
          label="Building"
          name="building"
          defaultValue={user.profile.directoryBuildingCode}
          options={buildingOptions}
        />
        <InputText
          onKeyUp={this.handleRoomChange.bind(this)}
          label="Room number"
          name="room"
          defaultValue={user.profile.campusRoomNumber}
          small
        />
        <Submit value="Update office information" />
        {this.state.updated && (
          <AlertSuccess>
            Your building and room have been updated. It might take a few hours
            for the change to make it to the public directory.
          </AlertSuccess>
        )}
      </form>
    )
  }
}

class UserAccountProfilePhone extends React.Component {
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
        {this.state.showForm && <UserAccountProfilePhoneForm user={user} />}
      </AccountGroup>
    )
  }
}

class UserAccountProfilePhoneForm extends React.Component {
  state = {
    phone: 0,
    updated: false,
  }
  handleSubmit(event) {
    const { user } = this.props
    event.preventDefault()
    updateOktaField(user, 'directoryPhone', this.state.phone)
    this.setState({
      updated: true,
    })
  }

  handleChange(event) {
    this.setState({
      phone: event.target.value.trim(),
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <InputText
          onKeyUp={this.handleChange.bind(this)}
          label="Phone number"
          name="phone"
          small
        />
        <Submit value="Update phone" />
        {this.state.updated && (
          <AlertSuccess>
            Your phone number has been updated. It might take a few hours for
            the change to make it to the public directory.
          </AlertSuccess>
        )}
      </form>
    )
  }
}

class UserAccountProfileBio extends React.Component {
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
      <AccountGroup legend="Biography">
        <p>
          Your biography is shown on the{' '}
          <Link to="/directory">public campus directory.</Link>
        </p>
        <AccountData>{user.profile.profileBio}</AccountData>
        <p>
          <Button onClick={this.handleShowForm.bind(this)} to="#phone">
            Update biography
          </Button>
        </p>
        {this.state.showForm && <UserAccountProfileBioForm user={user} />}
      </AccountGroup>
    )
  }
}

class UserAccountProfileBioForm extends React.Component {
  state = {
    biography: false,
    updated: false,
  }
  handleSubmit(event) {
    const { user } = this.props
    event.preventDefault()

    updateOktaField(user, 'profileBio', this.state.biography)
    this.setState({
      updated: true,
    })
  }

  handleChange(value) {
    this.setState({
      biography: value,
    })
  }

  render() {
    const { user } = this.props
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p>
          Your biography is edited in{' '}
          <a href="https://daringfireball.net/projects/markdown/">
            Markdown format
          </a>
          .
        </p>
        <SimpleMDE
          onChange={this.handleChange.bind(this)}
          value={user.profile.profileBio}
          options={{
            status: false,
            spellChecker: false,
            toolbar: [
              'bold',
              'link',
              'heading-2',
              'heading-3',
              'quote',
              'unordered-list',
              'ordered-list',
            ],
          }}
        />
        <Submit value="Update biography" />
        {this.state.updated && (
          <AlertSuccess>
            Your biography has been updated. It might take a few hours before
            your changes appear on the public directory.
          </AlertSuccess>
        )}
      </form>
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
              <Button onClick={onPick}>Change profile photo</Button>
            </div>
          )}
        />
      </AccountGroup>
    )
  }
}

export default AccountProfilePage

export const query = graphql`
  {
    allCsumbBuilding {
      edges {
        node {
          buildingName
          code
        }
      }
    }
  }
`
