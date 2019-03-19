import React from 'react'
import { EventFeedItem } from 'components/pages/event'
import { ContainerContext, ContainerElement } from '../container-context'

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
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            {title && <h3>{title}</h3>}
            {events.map((event, index) => (
              <React.Fragment key={index}>
                {displayEvent(event) && index < limit && (
                  <EventFeedItem {...event} />
                )}
              </React.Fragment>
            ))}
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockEventFeed
