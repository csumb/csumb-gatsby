import React from 'react'
import Container from 'components/container'
import { colors, fonts } from 'style/theme'
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
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const loginUrl =
  'https://csumb.okta.com/home/csumb_csumbbetawebsite_1/0oalhdw605Fe37hnQ0x7/alnlhdyx6zseWNBdS0x7'

const DashboardIntroWrapper = styled('div')`
  padding: 0.2rem 0;
  background: ${colors.indicators.low};
  color: ${colors.white};
  a {
    color: ${colors.white};
    font-weight: bold;
  }
`

const DashboardIntroClose = styled('button')`
  background: transparent;
  border: 0;
  float: right;
  color: ${colors.white};
  cursor: pointer;
`
class DashboardIntro extends React.Component {
  state = {
    hidden: false,
  }

  render() {
    if (cookies.get('csumbDashboardIntro') || this.state.hidden) {
      return null
    }
    return (
      <DashboardIntroWrapper>
        <Container>
          <DashboardIntroClose
            onClick={event => {
              this.setState({
                hidden: true,
              })
              cookies.set('csumbDashboardIntro', '1', { path: '/' })
            }}
          >
            <VisuallyHidden>Hide intro message</VisuallyHidden>
            <FontAwesomeIcon icon={faTimes} />
          </DashboardIntroClose>
          The dashboard has a new look. Your schedule, Ottercard, and more are
          now under <strong>Your account</strong> above.{' '}
          <a href="/dashboard/new">Learn more</a>.
        </Container>
      </DashboardIntroWrapper>
    )
  }
}

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

const EditOrderButton = styled('button')`
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
                <DashboardEditOrderApps />
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

class DashboardEditOrderApps extends React.Component {
  state = {
    showDialog: false,
  }

  render() {
    return (
      <>
        <EditOrderButton
          onClick={event => {
            event.preventDefault()
            this.setState({ showDialog: true })
          }}
        >
          Edit order
          <VisuallyHidden> of apps</VisuallyHidden>
        </EditOrderButton>
        <DialogOverlay
          style={{ background: 'rgba(0, 0, 0, 0.7)' }}
          isOpen={this.state.showDialog}
        >
          <MoreAppsDialog>
            <CloseDialog onClick={() => this.setState({ showDialog: false })}>
              <VisuallyHidden>Close dialog</VisuallyHidden>
              <FontAwesomeIcon icon={faTimes} />
            </CloseDialog>
            <h2>Edit app order</h2>
            <p>
              Your dashboard apps are managed in <strong>Okta</strong>. Continue
              to your Okta Dashboard and drag to reorder your apps.
            </p>
            <ButtonLink to="https://csumb.okta.com/" target="_blank">
              Open Okta Dashboard
            </ButtonLink>
          </MoreAppsDialog>
        </DialogOverlay>
      </>
    )
  }
}

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
                <li key={app.node.name}>
                  <a component="a" href={app.node.url}>
                    {app.node.name}
                  </a>
                </li>
              ))}
            </MoreAppsList>
            <Button onClick={() => this.setState({ showDialog: false })}>
              Close
            </Button>
            <MoreAppsMessage>
              <Link to="/dashboard/new">Why are these apps here?</Link>
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
        <DashboardAlumni />
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
  padding-right: 1rem;
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
          `https://edit.csumb.edu/api/dashboard?_session=${
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
      `https://edit.csumb.edu/api/dashboard/archive?_session=${session}&id=${id}`
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
  with: 100%;
  clear: both;
  margin-top: 0.5rem;
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

class DashboardAlumni extends React.Component {
  state = {
    isReady: false,
    session: false,
    alumniData: false,
    showDialog: false,
    success: false,
    agreed: false,
  }

  componentDidMount() {
    fetch('https://csumb.okta.com/api/v1/sessions/me', {
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        this.setState({
          isReady: false,
        })
      })
      .then(session => {
        this.setState({
          session: session.id,
        })
        fetch(`https://api.csumb.edu/alumni?token=${session.id}`)
          .then(response => {
            return response.json()
          })
          .then(content => {
            this.setState({
              isReady: true,
              alumniData: content,
            })
          })
          .catch(error => {
            this.setState({
              isready: false,
            })
          })
      })
      .catch(error => {
        this.setState({
          isReady: false,
        })
      })
  }

  handleJoin(event) {
    this.setState({
      showDialog: false,
      success: true,
    })
    fetch(`https://api.csumb.edu/alumni?token=${this.state.session}&register=1`)
  }

  render() {
    const { isReady, alumniData, showDialog, success, agreed } = this.state
    if (!isReady) {
      return null
    }
    if (!alumniData || !alumniData.showMessage) {
      return null
    }
    return (
      <DashboardCard>
        {success ? (
          <>
            <p>
              You have agreed to the terms for keeping your email after you
              graduate.
            </p>
            <p>
              Be sure to visit <a href="/alumni">csumb.edu/alumni</a> often to
              stay connected.
            </p>
          </>
        ) : (
          <>
            <h3>Welcome to the CSUMB Alumni Association</h3>
            <p>
              Congratulations on graduating! As a member of the Alumni
              Association, you can request to keep your @csumb.edu email.
            </p>
            <p>
              <Button
                onClick={event => {
                  event.preventDefault()
                  this.setState({
                    showDialog: true,
                  })
                }}
              >
                Keep your CSUMB Email
              </Button>
            </p>
          </>
        )}
        {showDialog && (
          <DialogOverlay
            style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            isOpen={this.state.showDialog}
          >
            <DialogContent>
              <CloseDialog onClick={() => this.setState({ showDialog: false })}>
                <VisuallyHidden>Close dialog</VisuallyHidden>
                <FontAwesomeIcon icon={faTimes} />
              </CloseDialog>
              <h2>Join the Alumni Association</h2>
              <p>
                Stay connected with fellow alumni and remain engaged with CSUMB
                as long as you continue to update your contact information. As a
                member you will receive many benefits, including keeping your
                csumb.edu email address.
              </p>
              <p>
                All individuals with a CSUMB email address are required to
                comply with CSUMB’s{' '}
                <a href="https://csumb.edu/policy/policy-acceptable-use-computing-information-technology-resources">
                  Policy on the Acceptable Use of Computing &amp; Information
                  Technology Resources
                </a>{' '}
                and{' '}
                <a href="http://www.calstate.edu/icsuam/documents/Section8000.pdf">
                  CSU’s Responsible Use policy
                </a>
                . Failure to comply with these policies may result in the
                suspension, deletion or termination of the CSUMB email account.
              </p>
              <p>
                <label>
                  <input
                    type="checkbox"
                    onClick={event => {
                      this.setState({
                        agreed: event.target.checked,
                      })
                    }}
                  />{' '}
                  I agree
                </label>
              </p>
              <Button disabled={!agreed} onClick={this.handleJoin.bind(this)}>
                Join alumni association
              </Button>
            </DialogContent>
          </DialogOverlay>
        )}
      </DashboardCard>
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
  DashboardIntro,
}
