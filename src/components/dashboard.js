import React from 'react'
import Container from 'components/container'
import { colors } from 'components/styles/theme'
import styled from 'react-emotion'
import Loading from 'components/loading'
import { ButtonLink } from 'components/button'
import Alert from '@reach/alert'
import VisuallyHidden from '@reach/visually-hidden'
import Link from 'gatsby-link'

const DashboardAppsWrapper = styled('div')`
  background: ${colors.primary.darkest};
`

const DashboardApp = styled('a')`
  color: ${colors.white};
  text-decoration: none;
  display: inline-block;
  margin-right: 0.8rem;
  padding: 0.4rem 0;
  &:hover {
    text-decoration: underline;
  }
  &:visited {
    color: ${colors.white};
  }
`

const EditOrderButton = styled(ButtonLink)`
  padding: 0.2rem;
  color: ${colors.white};
  border: 1px solid ${colors.white};
`

const DashboardAlert = styled(Alert)`
  display: block;
  padding: 0.5rem;
  margin-top: 1.5rem;
`
class DashboardApps extends React.Component {
  state = {
    apps: false,
  }

  componentDidMount() {
    window
      .fetch('https://csumb.okta.com/api/v1/users/me/appLinks', {
        credentials: 'include',
      })
      .then(response => {
        return response.json()
      })
      .then(apps => {
        this.setState({
          apps: apps,
        })
      })
      .catch(error => {
        this.setState({
          apps: false,
        })
      })
  }

  render() {
    return (
      <DashboardAppsWrapper>
        <Container>
          {this.state.apps && (
            <>
              {this.state.apps.map(app => (
                <span key={app.linkUrl}>
                  {app.label.search('CSUMB Website') === -1 && (
                    <DashboardApp
                      href={app.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {app.label.replace('Google Apps ', '')}
                    </DashboardApp>
                  )}
                </span>
              ))}
              <EditOrderButton to="https://csumb.okta.com/">
                Edit order
              </EditOrderButton>
            </>
          )}
        </Container>
      </DashboardAppsWrapper>
    )
  }
}

class DashboardMessages extends React.Component {
  state = {
    messages: false,
    didLoad: false,
  }

  getRoles() {
    const { user } = this.props
    let roles = []
    if (user._isStaff) {
      roles.push('staff')
    }
    if (user._isFaculty) {
      roles.push('faculty')
    }
    if (user._isEmployee) {
      roles.push('staff')
    }
    if (user._isStudent) {
      roles.push('student')
    }
    if (user._isApplicant) {
      roles.push('applicant')
    }
    return roles.join(',')
  }

  componentDidMount() {
    const login = this.props.user.profile.login.split('@').shift()
    window
      .fetch(
        `https://messaging-staging.herokuapp.com/api/messages/${login}/${this.getRoles()}`
      )
      .then(response => {
        return response.json()
      })
      .then(messages => {
        this.setState({
          messages: messages,
          didLoad: true,
        })
      })
      .catch(error => {
        this.setState({
          messages: false,
          didLoad: true,
        })
      })
  }

  render() {
    const { didLoad, messages } = this.state
    return (
      <>
        {didLoad ? (
          <>
            {messages && messages.length ? (
              <>
                {messages.map((message, key) => (
                  <DashboardMessage
                    key={key}
                    message={message}
                    user={this.props.user}
                  />
                ))}
              </>
            ) : (
              <DashboardAlert>You do not have any messages</DashboardAlert>
            )}
          </>
        ) : (
          <Loading>Loading messages</Loading>
        )}
      </>
    )
  }
}

const DashboardMessageElement = styled('div')`
  background: ${colors.secondary.highlight.light};
  padding: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
`

const DashboardMessageClose = styled('button')`
  border: 0;
  background: transparent;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
`
class DashboardMessage extends React.Component {
  state = {
    archived: false,
  }
  archiveMessage(event) {
    const { message, user } = this.props
    const login = user.profile.login.split('@').shift()
    event.preventDefault()
    window
      .fetch(
        `https://messaging-staging.herokuapp.com/api/archive/${login}/${
          message.uuid
        }`
      )
      .then(response => {
        return response.json()
      })
      .then(messages => {
        this.setState({
          archived: true,
        })
      })
      .catch(error => {
        this.setState({
          archived: false,
        })
      })
  }

  render() {
    const { title, message } = this.props.message
    return (
      <>
        {!this.state.archived && (
          <DashboardMessageElement>
            <DashboardMessageClose onClick={this.archiveMessage.bind(this)}>
              &times;
              <VisuallyHidden>Archive message</VisuallyHidden>
            </DashboardMessageClose>
            <h3>{title}</h3>
            <p>{message}</p>
          </DashboardMessageElement>
        )}
      </>
    )
  }
}

class DashboardEvents extends React.Component {
  state = {
    events: false,
    didLoad: false,
  }

  getRoles() {
    const { user } = this.props
    let roles = []
    if (user._isStaff) {
      roles.push('employee_staff')
    }
    if (user._isFaculty) {
      roles.push('employee_faculty')
    }
    if (user._isStudent) {
      roles.push('student_matriculated')
    }
    if (user._isApplicant) {
      roles.push('student_applicant')
    }
    return roles.join(',')
  }

  componentDidMount() {
    window
      .fetch(
        `https://csumb.edu/public/api/dashboard/events?role=${this.getRoles()}`
      )
      .then(response => {
        return response.json()
      })
      .then(events => {
        this.setState({
          events: events,
          didLoad: true,
        })
      })
      .catch(error => {
        this.setState({
          events: false,
          didLoad: true,
        })
      })
  }
  render() {
    return (
      <>
        {this.state.didLoad ? (
          <>
            {this.state.events ? (
              <>
                {this.state.events.map((event, key) => (
                  <DashboardEvent key={key} event={event} />
                ))}
              </>
            ) : (
              <DashboardAlert>No events</DashboardAlert>
            )}
          </>
        ) : (
          <Loading>Loading events</Loading>
        )}
      </>
    )
  }
}

const DashboardEventElement = styled('div')`
  border: 1px solid ${colors.muted.light};
  padding: 0.5rem;
  margin-bottom: 1rem;
`

const DashboardEvent = ({ event }) => (
  <DashboardEventElement>
    <Link to={event.link}>
      <h3>{event.headline}</h3>
    </Link>
    <h4>{event.date}</h4>
    <p>{event.description}</p>
  </DashboardEventElement>
)

export {
  DashboardEvents,
  DashboardEvent,
  DashboardMessages,
  DashboardMessage,
  DashboardApps,
  DashboardAppsWrapper,
  DashboardApp,
}
