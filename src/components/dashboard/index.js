import React from 'react'
import { colors } from 'style/theme'
import styled from '@emotion/styled'
import Loading from 'components/common/loading'
import { Flex, Box } from '@rebass/grid/emotion'
import NProgress from 'nprogress'

import '@reach/dialog/styles.css'

import DashboardIntro from './intro'
import DashboardApps from './apps'
import DashboardEmergency from './emergency'
import DashboardEvents from './events'
import DashboardSecondaryEmail from './secondary-email'
import DashboardNotLoggedIn from './not-logged-in'
import DashboardMessages from './messages'

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
          <>
            <DashboardEmergency session={session} />
            <DashboardSecondaryEmail session={session} />
            <Flex flexWrap="wrap">
              <Box width={[1, 1, 1 / 2, 1 / 2]} pr={[0, 4]}>
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
              <Box width={[1, 1, 1 / 2, 1 / 2]}>
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
          </>
        ) : (
          <Loading>Loading messages &amp; events</Loading>
        )}
      </>
    )
  }
}

export {
  DashboardApps,
  DashboardContent,
  DashboardMobileToolbar,
  DashboardIntro,
}