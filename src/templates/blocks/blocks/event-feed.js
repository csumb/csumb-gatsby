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

const getNextEventDate = dates => {
  let nextDate = false
  let lastDate = false
  let now = moment()
  dates.map(date => {
    const start = moment(date.start)
    if (!nextDate) {
      nextDate = start
    }
    const diff = start.diff(now)
    if (!lastDate || lastDate.diff(now) < diff) {
      lastDate = start
    }
    if (diff > -1 && (nextDate.diff(now) < -1 || diff < nextDate.diff(now))) {
      nextDate = start
    }
    return nextDate
  })
  if (!nextDate) {
    nextDate = lastDate
  }
  if (nextDate) {
    return nextDate
  }
  return null
}

const BlockEventFeed = ({ events, title, limit }) => {
  const displayEvents = []
  events.forEach(event => {
    if (displayEvent(event) && displayEvents.length <= limit) {
      const momentDate = getNextEventDate(event.dates)
      event.nextEventDate = momentDate.valueOf()
      displayEvents.push(event)
    }
  })
  if (!displayEvents.length) {
    return null
  }
  let sortedEvents = displayEvents.sort((a, b) => {
    if (
      typeof a.nextEventDate === 'undefined' ||
      typeof b.nextEventDate === 'undefined'
    ) {
      return 0
    }
    let aStart = a.nextEventDate
    let bStart = b.nextEventDate
    return aStart < bStart ? -1 : aStart > bStart ? 1 : 0
  })

  return (
    <EventFeedWrapper>
      {title && <h3>{title}</h3>}
      {sortedEvents.map((event, index) => (
        <EventFeedItem {...event} key={index} />
      ))}
    </EventFeedWrapper>
  )
}

export default BlockEventFeed
