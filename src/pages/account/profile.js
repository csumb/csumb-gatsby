import React, { Component } from 'react'
import { Layout, PageTitle } from '../../components/layouts/default'
import Container from '../../components/common/container'
import { Flex, Box } from '../../components/common/grid'
import { UserContext } from '../../components/contexts/user'
import Link from 'gatsby-link'
import styled from '@emotion/styled'
import ReactFilestack from 'filestack-react'
import {
  InputText,
  InputSelect,
  InputTextarea,
  Submit,
} from '../../components/common/forms'
import { graphql } from 'gatsby'
import { AlertSuccess } from '../../components/common/alert'
import {
  AccountGroup,
  AccountTitle,
  AccountData,
  AccountSidebar,
  AccountPlaceholder,
} from '../../components/pages/account'
import { Button } from '../../components/common/button'
import SimpleMDE from 'react-simplemde-editor'
import showdown from 'showdown'
import { LeadParagraph } from '../../components/common/type'
import 'simplemde/dist/simplemde.min.css'
import NProgress from 'nprogress'

const filestackApiKey = process.env.GATSBY_CSUMB_FILESTACK_KEY

const AccountPhoto = styled.img`
  max-width: 150px;
`

const updateProfileField = (user, field, value) => {
  fetch(
    `/cloud-functions/profile/update?token=${user.session}&user=${
      user._username
    }&field=${field}&value=${value}`
  )
}

class AccountProfilePage extends Component {
  state = {
    lastBuild: false,
  }

  componentDidMount() {
    NProgress.start()
    fetch('/_last-build.json')
      .then(result => {
        NProgress.inc()
        return result.json()
      })
      .then(lastBuild => {
        this.setState({
          lastBuild: lastBuild,
        })
      })
      .catch(() => {})
  }

  render() {
    const { lastBuild } = this.state
    return (
      <Layout pageTitle="Your profile">
        <UserContext.Consumer>
          {context => (
            <>
              {context.user ? (
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
                  <Flex>
                    <Box width={[1, 1 / 4]} pr={[0, 4]}>
                      <AccountSidebar active="profile" user={context.user} />
                    </Box>
                    <Box width={[1, 3 / 4]}>
                      {context.user.anonymous ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <AccountTitle>Your public profile</AccountTitle>
                          {lastBuild && (
                            <LeadParagraph>
                              Any changes you make to your profile will not be
                              published for an hour. The{' '}
                              <Link to="/status">
                                last time we updated the site
                              </Link>{' '}
                              was <strong>{lastBuild.format}</strong>.
                            </LeadParagraph>
                          )}
                          <UserAccountProfileForm
                            user={context.user}
                            buildings={this.props.data.allCsumbBuilding.edges}
                          />
                        </>
                      )}
                    </Box>
                  </Flex>
                </Container>
              ) : (
                <AccountPlaceholder />
              )}
            </>
          )}
        </UserContext.Consumer>
      </Layout>
    )
  }
}

class UserAccountProfileForm extends Component {
  state = {
    profile: false,
  }

  componentDidMount() {
    const that = this
    const now = new Date()
    const { user } = this.props
    fetch(
      `/cloud-functions/profile/get?token=${user.session}&user=${
        user._username
      }&_=${now.getTime()}`
    )
      .then(response => {
        NProgress.inc()
        return response.json()
      })
      .then(response => {
        NProgress.done()
        that.setState({
          profile: response,
        })
      })
  }

  render() {
    const { user, buildings } = this.props
    const { profile } = this.state
    const directoryTitle = user.profile.directoryTitle
      ? user.profile.directoryTitle.split(',')
      : false
    const directoryDepartment = user.profile.directoryDepartment
      ? user.profile.directoryDepartment.split(',')
      : false
    return (
      <>
        <AccountGroup legend="Job title">
          <p>
            Your job titles are shown on the{' '}
            <Link to="/directory">public campus directory.</Link>
          </p>
          {directoryTitle && (
            <>
              {directoryTitle.map((title, index) => (
                <AccountData key={index}>
                  {title}
                  <br />
                  <em>{directoryDepartment[index]}</em>
                </AccountData>
              ))}
            </>
          )}
          <p>
            <strong>Changing your job title:</strong> Your department and job
            title are controled by your human resources department.
          </p>
        </AccountGroup>
        <UserAccountProfileOffice
          user={user}
          buildings={buildings}
          profile={profile}
        />
        <UserAccountProfilePhone user={user} profile={profile} />
        <UserAccountProfileBio user={user} profile={profile} />
        <UserAccountProfileResume user={user} profile={profile} />
        <UserAccountProfileOfficeHours user={user} profile={profile} />
        <UserAccountProfileOfficeHoursDescription
          user={user}
          profile={profile}
        />
        <UserAccountProfilePhoto user={user} profile={profile} />
      </>
    )
  }
}

class UserAccountProfileOfficeHours extends Component {
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
    const { profile } = this.props
    return (
      <AccountGroup legend="Office appointment calendar">
        <p>
          Students can use your appointment calendar to book office hours.
          <a href="https://support.google.com/calendar/answer/190998?hl=en">
            Learn how to setup an appointment calendar
          </a>
        </p>
        {profile && profile.appointmentCalendar && (
          <AccountData>
            <a href={profile.appointmentCalendar}>View appointment calendar</a>
          </AccountData>
        )}
        <p>
          <Button onClick={this.handleShowForm.bind(this)} to="#phone">
            Change appointment calendar
          </Button>
        </p>
        {this.state.showForm && <UserAccountProfileOfficeHoursForm />}
      </AccountGroup>
    )
  }
}

class UserAccountProfileOfficeHoursForm extends Component {
  state = {
    calendar: false,
    updated: false,
  }
  handleSubmit(event) {
    event.preventDefault()
    updateProfileField(
      this.props.user,
      'appointmentCalendar',
      this.state.calendar
    )
    this.setState({
      updated: true,
    })
  }

  handleChange(event) {
    this.setState({
      calendar: event.target.value.trim(),
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <InputText
          onKeyUp={this.handleChange.bind(this)}
          label="Appointment calendar address"
          name="calendar"
          small
        />
        <Submit value="Update calendar" />
        {this.state.updated && (
          <AlertSuccess>
            Your appointment calendar has been updated. It might take a few
            hours for the change to make it to the public directory.
          </AlertSuccess>
        )}
      </form>
    )
  }
}

class UserAccountProfileOfficeHoursDescription extends Component {
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
    const { profile } = this.props
    return (
      <AccountGroup legend="Office hours">
        <p>Describe your office hours.</p>
        {profile && profile.officeHours && (
          <p
            dangerouslySetInnerHTML={{
              __html: profile.officeHours.replace('\n', '<br/>'),
            }}
          />
        )}
        <p>
          <Button onClick={this.handleShowForm.bind(this)} to="#phone">
            Change office hours
          </Button>
        </p>
        {this.state.showForm && (
          <UserAccountProfileOfficeHoursDescriptionForm />
        )}
      </AccountGroup>
    )
  }
}

class UserAccountProfileOfficeHoursDescriptionForm extends Component {
  state = {
    officeHours: false,
    updated: false,
  }
  handleSubmit(event) {
    event.preventDefault()
    updateProfileField(this.props.user, 'officeHours', this.state.officeHours)
    this.setState({
      updated: true,
    })
  }

  handleChange(event) {
    this.setState({
      officeHours: event.target.value.trim(),
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <InputTextarea
          onKeyUp={this.handleChange.bind(this)}
          label="Office hours"
          name="officeHours"
          small
        />
        <Submit value="Update office Hours" />
        {this.state.updated && (
          <AlertSuccess>
            Your office hours has been updated. It might take a few hours for
            the change to make it to the public directory.
          </AlertSuccess>
        )}
      </form>
    )
  }
}

class UserAccountProfileOffice extends Component {
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
    const { user, buildings, profile } = this.props
    const location = profile.location ? profile.location.split('-') : false
    let currentBuilding = false
    if (location) {
      buildings.forEach(building => {
        if (building.node.code === location[0]) {
          currentBuilding = building.node
        }
      })
    }
    return (
      <AccountGroup legend="Office location">
        <p>
          Your office location is shown on the{' '}
          <Link to="/directory">public campus directory.</Link>
        </p>
        <AccountData>
          {location && (
            <>
              {currentBuilding && (
                <>
                  {currentBuilding.buildingName} ({currentBuilding.code})
                </>
              )}
              <br />
              <em>Room {location[1]}</em>
            </>
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

class UserAccountProfileOfficeForm extends Component {
  state = {
    building: false,
    room: false,
    updated: false,
  }
  handleSubmit(event) {
    event.preventDefault()
    updateProfileField(
      this.props.user,
      'location',
      `${this.state.building}-${this.state.room}`
    )
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

class UserAccountProfilePhone extends Component {
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
    const { user, profile } = this.props
    return (
      <AccountGroup legend="Phone number">
        <p>
          Your phone number is shown on the{' '}
          <Link to="/directory">public campus directory.</Link>
        </p>
        {profile && <AccountData>{profile.phone}</AccountData>}
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

class UserAccountProfilePhoneForm extends Component {
  state = {
    phone: 0,
    updated: false,
  }
  handleSubmit(event) {
    event.preventDefault()
    updateProfileField(this.props.user, 'phone', this.state.phone)
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

class UserAccountProfileBio extends Component {
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
    const { user, profile } = this.props
    const converter = new showdown.Converter()
    return (
      <AccountGroup legend="Biography">
        <p>
          Your biography is shown on the{' '}
          <Link to="/directory">public campus directory.</Link>
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(profile.biography),
          }}
        />
        <p>
          <Button onClick={this.handleShowForm.bind(this)}>
            Update biography
          </Button>
        </p>
        {this.state.showForm && (
          <UserAccountProfileBioForm profile={profile} user={user} />
        )}
      </AccountGroup>
    )
  }
}

class UserAccountProfileBioForm extends Component {
  state = {
    biography: false,
    updated: false,
  }
  handleSubmit(event) {
    event.preventDefault()
    updateProfileField(this.props.user, 'biography', this.state.biography)
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
    const { profile } = this.props
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
          value={profile.biography}
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

class UserAccountProfilePhoto extends Component {
  savePhoto(photo) {
    updateProfileField(this.props.user, 'photo', photo.filesUploaded[0].url)
  }

  render() {
    const { profile } = this.props
    return (
      <AccountGroup legend="Profile photo">
        <p>
          This photo is shown on the{' '}
          <Link to="/directory">public campus directory.</Link>
        </p>
        {profile.photo && (
          <AccountData>
            <AccountPhoto
              src={profile.photo.replace('/csumb.edu/', '/edit.csumb.edu/')}
              alt="Your profile"
            />
          </AccountData>
        )}
        <ReactFilestack
          apikey={filestackApiKey}
          onSuccess={this.savePhoto.bind(this)}
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

class UserAccountProfileResume extends Component {
  saveResume(file) {
    updateProfileField(this.props.user, 'resume', file.filesUploaded[0].url)
  }

  render() {
    const { profile } = this.props
    return (
      <AccountGroup legend="Curriculum vitae or resume">
        <p>
          Your resume is shown as part of your{' '}
          <Link to="/directory">public profile.</Link>
        </p>
        {profile.resume && (
          <AccountData>
            <a href={profile.resume}>Your curriculum vitae or resume</a>
          </AccountData>
        )}
        <ReactFilestack
          apikey={filestackApiKey}
          onSuccess={this.saveResume}
          options={{
            accept: 'application/*',
            maxFiles: 1,
            storeTo: {
              location: 's3',
            },
          }}
          render={({ onPick }) => (
            <div>
              <Button onClick={onPick}>Change CV or resume</Button>
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
