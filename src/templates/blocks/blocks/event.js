import React from 'react'
import { Event } from 'components/event'
import { ContainerContext, ContainerElement } from '../container-context'


class BlockEvent extends React.Component {
  render() {
    const { event } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <Event event={event} />
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockEvent
