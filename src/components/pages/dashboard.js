import React from 'react'
import Container from 'components/container'
import { colors } from 'style/theme'
import styled from '@emotion/styled'
import Loading from 'components/loading'
import { Flex, Box } from '@rebass/grid/emotion'
import { AlertEmpty } from 'components/alert'
import VisuallyHidden from 'components/visually-hidden'
import Link from 'gatsby-link'
import { ButtonLink, Button } from 'components/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronUp,
  faChevronDown,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import '@reach/menu-button/styles.css'
import '@reach/dialog/styles.css'
import NProgress from 'nprogress'

const loginUrl =
  'https://csumb.okta.com/home/csumb_csumbbetawebsite_1/0oalhdw605Fe37hnQ0x7/alnlhdyx6zseWNBdS0x7'

const DashboardAppsWrapper = styled('div')`
  background: ${colors.primary.dark};
  padding: 0.5rem 0 0.4rem 0;
`

const DashboardApp = styled('a')`
  ${props =>
    props.isMobile
      ? `
    display: block;
    margin: 1rem 0;
    `
      : `
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
    `}
`

const appToolsStyle = `
  padding: 0.2rem;
  border: 1px solid ${colors.white};
  margin-top: 0.5rem;
  display: inline-block;
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

const MoreAppsButton = styled('button')`
  ${appToolsStyle};
`

const dashboardWrapperStyle = `
  padding: 1rem;
`

const DashboardMessageWrapper = styled('div')`
  ${dashboardWrapperStyle};
  background: ${colors.primary.light};
`

const DashboardEventWrapper = styled('div')`
  ${dashboardWrapperStyle};
  background: ${colors.muted.light};
`

const DasbhoardAppToggle = styled('button')`
  float: right;
  margin-left: 1rem;
  background: transparent;
  color: ${colors.white};
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
`

const MoreAppsDialog = styled(DialogContent)`
  width: 75vw;
`

class DashboardApps extends React.Component {
  state = {
    oktaApps: false,
    isExpanded: false,
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
        const oktaApps = {
          top: [],
          bottom: [],
        }
        apps.sort((a, b) => {
          return a.sortOrder - b.sortOrder
        })
        apps.forEach((app, index) => {
          if (app.label.search('CSUMB Website') === -1) {
            app.label = app.label.replace('Google Apps ', '')
            if (index < 9) {
              oktaApps.top.push(app)
            } else {
              oktaApps.bottom.push(app)
            }
          }
        })
        this.setState({
          oktaApps: oktaApps,
        })
      })
      .catch(error => {
        this.setState({
          oktaApps: false,
        })
      })
  }

  handleToggle(event) {
    event.preventDefault()
    this.setState({
      isExpanded: !this.state.isExpanded,
    })
  }

  render() {
    const { apps, isMobile } = this.props
    const { oktaApps, isExpanded } = this.state
    if (!oktaApps) {
      return null
    }
    if (isMobile) {
      return (
        <Container topPadding>
          <DashboardOktaAppList apps={oktaApps.top} isMobile={true} />
          <DashboardOktaAppList apps={oktaApps.bottom} isMobile={true} />
        </Container>
      )
    }
    return (
      <DashboardAppsWrapper>
        <Container>
          <DasbhoardAppToggle onClick={this.handleToggle.bind(this)}>
            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
            <VisuallyHidden>View more apps</VisuallyHidden>
          </DasbhoardAppToggle>
          <DashboardOktaAppList apps={oktaApps.top} />
        </Container>
        {isExpanded && (
          <Container>
            <Flex flexWrap="wrap">
              <Box width={[1, 10 / 12, 10 / 12]} pr={3}>
                <DashboardOktaAppList apps={oktaApps.bottom} />
              </Box>
              <Box width={[1, 2 / 12, 2 / 12]}>
                <EditOrderButton href="https://csumb.okta.com/" target="_blank">
                  Edit order
                  <VisuallyHidden> of apps</VisuallyHidden>
                </EditOrderButton>
                <DashboardOtherApps apps={apps} />
              </Box>
            </Flex>
          </Container>
        )}
      </DashboardAppsWrapper>
    )
  }
}

const DashboardOktaAppList = ({ apps, isMobile }) => (
  <>
    {apps.map((app, index) => (
      <DashboardApp
        href={app.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        key={app.linkUrl}
        isMobile={isMobile}
      >
        {app.label}
      </DashboardApp>
    ))}
  </>
)

const MoreAppsList = styled('ul')`
  list-style-type: none;
  margin: 0;
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
  li {
    padding-left: 0;
  }
`

const CloseDialog = styled('button')`
  cursor: pointer;
  background: transparent;
  float: right;
  font-size: 1.4rem;
  border: none;
  margin-top: -1rem;
  margin-right: -1rem;
`

const MoreAppsMessage = styled('p')`
  font-size: 0.8rem;
  text-align: right;
`

const DashboardMobileToolbar = styled('div')`
  background: ${colors.primary.darkest};
  button {
    color: ${colors.white};
    border: none;
    background: transparent;
    width: 33.3333333333333333%;
    text-align: center;
    margin: 0;
    padding: 5px 0;
    cursor: pointer;
  }
`

class DashboardOtherApps extends React.Component {
  state = {
    showDialog: false,
  }

  render() {
    const { apps } = this.props
    return (
      <>
        <MoreAppsButton onClick={() => this.setState({ showDialog: true })}>
          More apps
        </MoreAppsButton>
        <DialogOverlay
          style={{ background: 'rgba(0, 0, 0, 0.7)' }}
          isOpen={this.state.showDialog}
        >
          <MoreAppsDialog>
            <CloseDialog onClick={() => this.setState({ showDialog: false })}>
              <VisuallyHidden>Close dialog</VisuallyHidden>
              <FontAwesomeIcon icon={faTimes} />
            </CloseDialog>
            <h2>More apps</h2>
            <MoreAppsList>
              {apps.map(app => (
                <li>
                  <a key={app.node.name} component="a" href={app.node.url}>
                    {app.node.name}
                  </a>
                </li>
              ))}
            </MoreAppsList>
            <Button onClick={() => this.setState({ showDialog: false })}>
              Close
            </Button>
            <MoreAppsMessage>
              <a href="https://github.com/csumb/csumb-gatsby/wiki/The-%22More-apps%22-button-in-the-dashboard">
                Why are these apps here?
              </a>
            </MoreAppsMessage>
          </MoreAppsDialog>
        </DialogOverlay>
      </>
    )
  }
}

class DashboardMessages extends React.Component {
  render() {
    const { messages, archive } = this.props
    return (
      <>
        {messages && messages.length ? (
          <>
            {messages.map((message, key) => (
              <DashboardMessage
                key={key}
                message={message}
                user={this.props.user}
                archive={archive}
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
  overflow: hidden;
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

const NotLoggedIn = styled('div')`
  font-size: 2rem;
  text-align: center;
  margin: 1rem 0;
`

const LoginMessage = styled('p')`
  font-size: 0.8rem;
  margin: 0.5rem 0;
`

class DashboardNotLoggedIn extends React.Component {
  state = {
    redirect: false,
  }

  componentDidMount() {
    const that = this
    setTimeout(() => {
      that.setState({
        redirect: true,
      })
    }, 5000)
  }

  componentDidUpdate() {
    if (this.state.redirect) {
      window.location.href = loginUrl
    }
  }

  render() {
    return (
      <NotLoggedIn>
        <p>You are not logged in.</p>
        <ButtonLink to={loginUrl}>Log in</ButtonLink>
        <LoginMessage>We'll log you in shortly....</LoginMessage>
      </NotLoggedIn>
    )
  }
}

class DashboardContent extends React.Component {
  state = {
    ready: false,
    events: false,
    messages: false,
    session: false,
    notLoggedIn: false,
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
    NProgress.start()
    fetch('https://csumb.okta.com/api/v1/sessions/me', {
      credentials: 'include',
    })
      .then(response => {
        NProgress.inc()
        if (response.ok) {
          return response.json()
        }

        this.setState({
          ready: false,
          notLoggedIn: true,
        })
      })
      .then(session => {
        this.setState({
          session: session.id,
        })
        fetch(
          `https://csumb.edu/api/dashboard?_session=${
            session.id
          }&role=${userRoles}&_t=${Date.now()}`
        )
          .then(response => {
            NProgress.inc()
            return response.json()
          })
          .then(content => {
            NProgress.done()
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
        this.setState({
          ready: false,
          notLoggedIn: true,
        })
      })
  }

  archive(id, session) {
    fetch(
      `https://csumb.edu/api/dashboard/archive?_session=${session}&id=${id}`
    )
  }

  render() {
    const { ready, events, messages, session, notLoggedIn } = this.state
    const { isMobile, mobileTab, moreApps } = this.props
    if (notLoggedIn) {
      return <DashboardNotLoggedIn />
    }
    if (isMobile && ready) {
      return (
        <>
          {mobileTab === 'messages' && (
            <DashboardMessageWrapper>
              <h2>Messages</h2>
              <DashboardMessages
                messages={messages}
                archive={id => {
                  this.archive(id, session)
                }}
              />
            </DashboardMessageWrapper>
          )}
          {mobileTab === 'events' && (
            <DashboardEventWrapper>
              <h2>Events</h2>
              <DashboardEvents
                events={events}
                archive={id => {
                  this.archive(id, session)
                }}
              />
            </DashboardEventWrapper>
          )}
          {mobileTab === 'apps' && (
            <DashboardApps isMobile={true} apps={moreApps} />
          )}
        </>
      )
    }
    return (
      <>
        {ready ? (
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
              <DashboardEventWrapper>
                <h2>Events</h2>
                <DashboardEvents
                  events={events}
                  archive={id => {
                    this.archive(id, session)
                  }}
                />
              </DashboardEventWrapper>
            </Box>
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
              <DashboardMessageWrapper>
                <h2>Messages</h2>
                <DashboardMessages
                  messages={messages}
                  archive={id => {
                    this.archive(id, session)
                  }}
                />
              </DashboardMessageWrapper>
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
    event.preventDefault()
    this.setState({
      archived: true,
    })
    this.props.archive(this.props.message.id)
  }

  render() {
    const { headline, message, link } = this.props.message
    const { archived } = this.state
    return (
      <>
        {!archived && (
          <DashboardCard>
            <DashboardMessageClose onClick={this.archiveMessage.bind(this)}>
              &times;
              <VisuallyHidden>Archive message</VisuallyHidden>
            </DashboardMessageClose>
            <Link to={link}>
              <DashboardCardHeader>{headline}</DashboardCardHeader>
            </Link>
            <p>{message}</p>
          </DashboardCard>
        )}
      </>
    )
  }
}

class DashboardEvents extends React.Component {
  render() {
    const { events, archive } = this.props
    return (
      <>
        {events ? (
          <>
            {events.map((event, key) => (
              <DashboardEvent key={key} event={event} archive={archive} />
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

const DashboardImage = styled('img')`
  float: right;
  width: 150px;
  margin-left: 0.5rem;
`

const DashboardEventCalendarLink = styled('div')`
  text-align: right;
  with: 100%;
`

class DashboardEvent extends React.Component {
  state = {
    archived: false,
  }

  archiveMessage(event) {
    event.preventDefault()
    this.setState({
      archived: true,
    })
    this.props.archive(this.props.event.id)
  }

  render() {
    const { event } = this.props
    const { archived } = this.state
    return (
      <>
        {!archived && (
          <DashboardCard>
            <DashboardMessageClose onClick={this.archiveMessage.bind(this)}>
              &times;
              <VisuallyHidden>Archive message</VisuallyHidden>
            </DashboardMessageClose>
            <Link to={event.link}>
              <DashboardCardHeader noMargin>
                {event.headline}
              </DashboardCardHeader>
            </Link>
            <DashboardEventDate>
              {event.date} {event.time_start}
            </DashboardEventDate>
            {event.image && <DashboardImage src={event.image} />}
            <div>{event.description}</div>
            <DashboardEventCalendarLink>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={event.add_calendar}
              >
                Add to calendar
              </a>
            </DashboardEventCalendarLink>
          </DashboardCard>
        )}
      </>
    )
  }
}

export {
  DashboardEvents,
  DashboardEvent,
  DashboardMessages,
  DashboardMessage,
  DashboardApps,
  DashboardAppsWrapper,
  DashboardApp,
  DashboardContent,
  DashboardMobileToolbar,
}
