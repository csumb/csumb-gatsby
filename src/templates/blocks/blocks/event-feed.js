import React from 'react'
import { EventFeedItem } from 'components/events'
import styled from '@emotion/styled'
import { colors } from 'style/theme'

const EventFeedWrapper = styled('section')`
  background: ${colors.primary.lightest};
  padding: 1.5rem;
  margin: 2rem 0;
`

const displayEvent = item => {
  const time = new Date()
  const currentTime = time.getTime() / 1000
  let display = false
  item.date_stamps.forEach(stamp => {
    if (stamp.end_stamp >= currentTime) {
      display = true
    }
  })
  return display
}

class BlockEventFeed extends React.Component {
  render() {
    const { events, title, limit } = this.props
    const displayEvents = []
    events.forEach(event => {
      if (displayEvent(event) && displayEvents.length < limit) {
        displayEvents.push(event)
      }
    })
    return (
      <EventFeedWrapper>
        {title && <h3>{title}</h3>}
        {displayEvents.map((event, index) => (
          <EventFeedItem {...event} key={index} />
        ))}
      </EventFeedWrapper>
    )
  }
}

export default BlockEventFeed
