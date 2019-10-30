import React, { Component } from 'react'
import { colors } from '../../style'
import styled from '@emotion/styled'
import { Flex, Box } from '../common/grid'
import NProgress from 'nprogress'
import { PlaceholderCard } from './placeholders'
import DashboardApps from './apps'
import { DashboardEvents } from './events'
import { DashboardMessages } from './messages'
import DashboardTitleNine from './title-nine'
import DashboardSecondary from './secondary-email'

const dashboardWrapperStyle = `
  padding: 1rem;
`

const DashboardMessageWrapper = styled.div`
  ${dashboardWrapperStyle};
  background: ${colors.primary.light};
`

const DashboardEventWrapper = styled.div`
  ${dashboardWrapperStyle};
  background: ${colors.muted.light};
`

const DashboardMobileToolbar = styled.div`
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

class DashboardContent extends Component {
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
    NProgress.start()
    const url = this.props.archivedContent
      ? `https://edit.csumb.edu/api/dashboard/archived-items`
      : `https://edit.csumb.edu/api/dashboard`
    fetch(
      `${url}?token=${user.session}&user=${
        user._username
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
  }

  archive(id, session) {
    const { user } = this.props
    fetch(
      `https://edit.csumb.edu/api/dashboard/archive?token=${
        user.session
      }&user=${user._username}`
    )
  }

  render({ showTitleNineMessage }) {
    const { ready, events, messages } = this.state
    const { user, isMobile, mobileTab, moreApps, archivedContent } = this.props
    if (isMobile && ready) {
      return (
        <>
          {mobileTab === 'messages' && (
            <DashboardMessageWrapper>
              <DashboardSecondary user={this.props.user} />
              <h2>Messages</h2>

              {showTitleNineMessage && (
                <DashboardTitleNine user={this.props.user} />
              )}
              <DashboardMessages
                messages={messages}
                archive={id => {
                  this.archive(id)
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
                  this.archive(id)
                }}
              />
            </DashboardEventWrapper>
          )}
          {mobileTab === 'apps' && (
            <DashboardApps isMobile={true} user={user} apps={moreApps} />
          )}
        </>
      )
    }
    return (
      <>
        <DashboardSecondary user={this.props.user} />
        {showTitleNineMessage && <DashboardTitleNine user={this.props.user} />}
        <Flex>
          <Box width={[1, 1, 1 / 2, 1 / 2]} pr={[0, 4]}>
            <DashboardEventWrapper>
              <h2>Events</h2>

              {ready ? (
                <DashboardEvents
                  events={events}
                  archive={id => {
                    this.archive(id)
                  }}
                  archivedContent={archivedContent}
                />
              ) : (
                <>
                  <PlaceholderCard />
                  <PlaceholderCard />
                  <PlaceholderCard />
                  <PlaceholderCard />
                </>
              )}
            </DashboardEventWrapper>
          </Box>
          <Box width={[1, 1, 1 / 2, 1 / 2]}>
            <DashboardMessageWrapper>
              <h2>Messages</h2>
              {ready ? (
                <DashboardMessages
                  messages={messages}
                  archive={id => {
                    this.archive(id)
                  }}
                  archivedContent={archivedContent}
                />
              ) : (
                <>
                  <PlaceholderCard />
                  <PlaceholderCard />
                  <PlaceholderCard />
                  <PlaceholderCard />
                </>
              )}
            </DashboardMessageWrapper>
          </Box>
        </Flex>
      </>
    )
  }
}

export { DashboardApps, DashboardContent, DashboardMobileToolbar }
