import React, { Component } from 'react'
import { Event } from '../../../components/events'

class BlockEvent extends Component {
  render() {
    const { event } = this.props
    if (!event) {
      return null
    }
    return <Event event={event} linkToEvent={true} />
  }
}

export default BlockEvent
