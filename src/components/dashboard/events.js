import React, { Component } from 'react'
import { fonts } from 'style/theme'
import styled from '@emotion/styled'
import { AlertEmpty } from 'components/common/alert'
import VisuallyHidden from 'components/utilities/visually-hidden'
import Link from 'gatsby-link'

import {
  DashboardCard,
  DashboardMessageClose,
  DashboardCardHeader,
} from './shared-styles'

class DashboardEvents extends Component {
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

const DashboardEventDate = styled.h4`
  font-family: ${fonts.body};
`

const DashboardImage = styled.img`
  float: right;
  width: 150px;
  margin-left: 0.5rem;
`

const DashboardEventCalendarLink = styled.div`
  with: 100%;
  clear: both;
  margin-top: 0.5rem;
`

class DashboardEvent extends Component {
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

export { DashboardEvents, DashboardEvent }
