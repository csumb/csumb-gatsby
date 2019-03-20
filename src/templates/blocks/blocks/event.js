import React from 'react'
import { Event } from 'components/pages/event'

class BlockEvent extends React.Component {
  render() {
    const { event } = this.props
    if (!event) {
      return null
    }
    return <Event event={event} />
  }
}

export default BlockEvent
