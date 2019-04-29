import React from 'react'
import { Event } from 'components/events'

class BlockEvent extends React.Component {
  render() {
    const { event } = this.props
    if (!event) {
      return null
    }
    return <Event event={event} linkToEvent={true} />
  }
}

export default BlockEvent
