import React from 'react'
import Container from 'components/container'
import { colors, fonts } from 'components/styles/theme'
import styled from '@emotion/styled'
import Loading from 'components/loading'
import { Flex, Box } from '@rebass/grid/emotion'
import { AlertEmpty } from 'components/alert'
import VisuallyHidden from 'components/visually-hidden'
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button'
import Link from 'gatsby-link'

import '@reach/menu-button/styles.css'
const DashboardAppsWrapper = styled('div')`
  background: ${colors.primary.dark};
  padding: 0.5rem 0 0.4rem 0;
`

const DashboardApp = styled('a')`
  color: ${colors.white};
  text-decoration: none;
  display: inline-block;
  margin-right: 0.8rem;
  margin-top: 0.5rem;
  padding: 0.2rem;
  &:hover {
    text-decoration: underline;
  }
  &:visited {
    color: ${colors.white};
  }
`

const appToolsStyle = `
  padding: 0.2rem;
  border: 1px solid ${colors.white};
  margin-top: 0.5rem;
  display: block;
  background: transparent;
  color: ${colors.white};
  text-align: center;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: ${colors.primary.darkest};
  }
  &:link,
  &:visited {
    color: ${colors.white};
  }
`

const EditOrderButton = styled('a')`
  ${appToolsStyle};
  text-decoration: none;
`

const AppTools = styled(Box)`
  text-align: right;
`

const AppsDropdownButton = styled(MenuButton)`
  ${appToolsStyle};
`

const AppsDropdownMenuList = styled(MenuList)`
  border: 1px solid ${colors.black};
  padding: 0;
  font-family: ${fonts.body};
  a {
    color: ${colors.primary.darkest};
  }
`

const AppsDropdownMenuLink = styled(MenuLink)`
  padding: 0.5rem;
  color: ${colors.primary.darkest};
  &:hover,
  &:focus {
    background: ${colors.primary.darkest};
    color: ${colors.white};
  }
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
    const { apps } = this.props
    return (
      <DashboardAppsWrapper>
        <Container>
          {this.state.apps && (
            <Flex flexWrap="wrap">
              <Box width={[1, 10 / 12]} pr={2}>
                {this.state.apps.map(app => (
                  <React.Fragment key={app.linkUrl}>
                    {app.label.search('CSUMB Website') === -1 && (
                      <DashboardApp
                        href={app.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {app.label.replace('Google Apps ', '')}
                      </DashboardApp>
                    )}
                  </React.Fragment>
                ))}
              </Box>
              <AppTools width={[1, 2 / 12]}>
                <EditOrderButton href="https://csumb.okta.com/" target="_blank">
                  Edit order
                  <VisuallyHidden> of apps</VisuallyHidden>
                </EditOrderButton>
                <Menu>
                  <AppsDropdownButton>
                    More apps <span aria-hidden>▾</span>
                  </AppsDropdownButton>
                  <AppsDropdownMenuList>
                    {apps.map(app => (
                      <AppsDropdownMenuLink
                        key={app.node.ndame}
                        component="a"
                        href={app.node.url}
                      >
                        {app.node.name}
                      </AppsDropdownMenuLink>
                    ))}
                  </AppsDropdownMenuList>
                </Menu>
              </AppTools>
            </Flex>
          )}
        </Container>
      </DashboardAppsWrapper>
    )
  }
}

class DashboardMessages extends React.Component {
  render() {
    const { messages } = this.props
    return (
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
          <AlertEmpty>You do not have any messages</AlertEmpty>
        )}
      </>
    )
  }
}

const DashboardCard = styled('div')`
  background: ${colors.white};
  padding: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
`

const DashboardCardHeader = styled('h3')`
  font-family: ${fonts.body};
  ${props =>
    props.noMargin &&
    `
    margin-bottom: 0;
  `};
`

const DashboardMessageClose = styled('button')`
  border: 0;
  background: transparent;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1rem;
  font-weight: bold;
  color: ${colors.muted.dark};
`

class DashboardContent extends React.Component {
  state = {
    ready: false,
    events: false,
    messages: false,
  }

  componentDidMount() {
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

    const userRoles = roles.join(',')
    fetch('https://csumb.okta.com/api/v1/sessions/me', {
      credentials: 'include',
    })
      .then(response => {
        return response.json()
      })
      .then(session => {
        fetch(
          `https://csumb.edu/api/dashboard?_session=${
            session.id
          }&role=${userRoles}`
        )
          .then(response => {
            return response.json()
          })
          .then(content => {
            this.setState({
              events: content.events,
              messages: content.messages,
              ready: true,
            })
          })
          .catch(error => {
            this.setState({
              events: false,
              didLoad: true,
            })
          })
      })
      .catch(error => {
        this.setState({ ready: false })
      })
  }
  render() {
    const { ready, events, messages } = this.state
    return (
      <>
        {ready ? (
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
              <h2>Events</h2>
              <DashboardEvents events={events} />
            </Box>
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
              <h2>Messages</h2>
              <DashboardMessages messages={messages} />
            </Box>
          </Flex>
        ) : (
          <Loading>Loading messages &amp; events</Loading>
        )}
      </>
    )
  }
}

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
          <DashboardCard>
            <DashboardMessageClose onClick={this.archiveMessage.bind(this)}>
              &times;
              <VisuallyHidden>Archive message</VisuallyHidden>
            </DashboardMessageClose>
            <DashboardCardHeader>{title}</DashboardCardHeader>
            <p>{message}</p>
          </DashboardCard>
        )}
      </>
    )
  }
}

class DashboardEvents extends React.Component {
  render() {
    const { events } = this.props
    return (
      <>
        {events ? (
          <>
            {events.map((event, key) => (
              <DashboardEvent key={key} event={event} />
            ))}
          </>
        ) : (
          <AlertEmpty>No events</AlertEmpty>
        )}
      </>
    )
  }
}

const DashboardEventDate = styled('h4')`
  font-family: ${fonts.body};
`

const DashboardEvent = ({ event }) => (
  <DashboardCard>
    <Link to={event.link}>
      <DashboardCardHeader noMargin>{event.headline}</DashboardCardHeader>
    </Link>
    <DashboardEventDate>{event.date}</DashboardEventDate>
    <p>{event.description}</p>
  </DashboardCard>
)

export {
  DashboardEvents,
  DashboardEvent,
  DashboardMessages,
  DashboardMessage,
  DashboardApps,
  DashboardAppsWrapper,
  DashboardApp,
  DashboardContent,
}
