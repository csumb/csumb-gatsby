import React from 'react'
import { EventFeedItem } from 'components/event'
import { ContainerContext, ContainerElement } from '../container-context'


class BlockEvent extends React.Component {
  render() {
    const { events } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            {events.map(event => (
              <EventFeedItem event={event} />
            ))}
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockEvent
