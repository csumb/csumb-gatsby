import React from 'react'
import { EventFeedItem } from '../../../components/events'
import styled from '@emotion/styled'
import { colors } from '../../../style'
import moment from 'moment'

const EventFeedWrapper = styled('section')`
  background: ${colors.primary.lightest};
  padding: 1.5rem;
  margin: 2rem 0;
`
const time = new Date()
const currentTime = time.getTime() / 1000 - 24 * 60 * 60

const displayEvent = item => {
  let display = false
  item.date_stamps.forEach(stamp => {
    if (stamp.end_stamp >= currentTime) {
      display = true
    }
  })
  return display
}

const BlockEventFeed = ({ events, title, limit }) => {
  const displayEvents = []
  events.forEach(event => {
    if (displayEvent(event) && displayEvents.length <= limit) {
      displayEvents.push(event)
    }
  })
  if (!displayEvents.length) {
    return null
  }
  displayEvents.sort((a, b) => {
    if (
      typeof a.dates[0] === 'undefined' ||
      typeof b.dates[0] === 'undefined'
    ) {
      return 0
    }
    if (
      moment(a.dates[0].start, 'YYYY-MM-DD').isAfter(
        moment(b.dates[0].start, 'YYYY-MM-DD')
      )
    ) {
      return 1
    }
    return -1
  })

  return (
    <EventFeedWrapper className="event-feed">
      {title && <h3>{title}</h3>}
      {displayEvents.map((event, index) => (
        <EventFeedItem {...event} key={index} />
      ))}
    </EventFeedWrapper>
  )
}

export default BlockEventFeed
