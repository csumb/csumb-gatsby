import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import { UserContext } from 'components/contexts/user'
import Link from 'gatsby-link'
import styled from 'react-emotion'
import ReactFilestack from 'filestack-react'
import { InputText, InputSelect, Submit } from 'components/forms'
import { StaticQuery, graphql } from 'gatsby'
import {
  AccountGroup,
  AccountTitle,
  AccountData,
  AccountSidebar,
} from 'components/account'
import { Button } from 'components/button'

const AccountPhoto = styled('img')`
  max-width: 150px;
`
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
                    {context.user === 'anonymous' ? (
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
                      {context.user === 'anonymous' ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <AccountTitle>Your public profile</AccountTitle>
                          <UserAccountProfileForm user={context.user} />
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
        <UserAccountProfileOffice user={user} />
        <UserAccountProfilePhone user={user} />
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
    const { user } = this.props
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
        {this.state.showForm && <UserAccountProfileOfficeForm user={user} />}
      </AccountGroup>
    )
  }
}

class UserAccountProfileOfficeForm extends React.Component {
  state = {
    building: false,
    room: false,
  }
  handleSubmit(event) {
    event.preventDefault()
  }
  handleRoomChange(event) {
    this.setState({
      room: event.target.value,
    })
  }
  handleBuildingChange(event) {
    this.setState({
      building: event.target.value,
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <InputSelect
          onChange={this.handleBuildingChange.bind(this)}
          label="Building"
          name="building"
        >
          <StaticQuery
            query={graphql`
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
            `}
            render={data => (
              <>
                {data.allCsumbBuilding.edges.map(building => (
                  <option value={building.node.code}>
                    {building.node.buildingName} ({building.node.code})
                  </option>
                ))}
              </>
            )}
          />
        </InputSelect>
        <InputText
          onKeyUp={this.handleRoomChange.bind(this)}
          label="Room number"
          name="room"
          defaultValue="100"
          small
        />
        <Submit value="Update office information" />
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
  }
  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.phone)
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
          small
        />
        <Submit value="Update phone" />
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
