import React from 'react'
import { EventFeedItem } from 'components/pages/event'
import { ContainerContext, ContainerElement } from '../container-context'
import styled from '@emotion/styled'
import { colors } from 'style/theme'

const EventFeedWrapper = styled('section')`
  background: ${colors.primary.lightest};
  padding: 1.5rem 0;
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
    return (
      <EventFeedWrapper>
        <ContainerContext.Consumer>
          {container => (
            <ContainerElement container={container}>
              {title && <h3>{title}</h3>}
              {events.map((event, index) => (
                <React.Fragment key={index}>
                  {displayEvent(event) && index < limit && (
                    <EventFeedItem {...event} key={index} />
                  )}
                </React.Fragment>
              ))}
            </ContainerElement>
          )}
        </ContainerContext.Consumer>
      </EventFeedWrapper>
    )
  }
}

export default BlockEventFeed
