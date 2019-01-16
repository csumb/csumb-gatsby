import React from 'react'
import { Event } from 'components/pages/event'
import { ContainerContext, ContainerElement } from '../container-context'

class BlockEvent extends React.Component {
  render() {
    const { event } = this.props
    if (!event) {
      return null
    }
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
