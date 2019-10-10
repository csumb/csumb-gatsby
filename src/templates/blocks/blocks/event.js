import React from 'react'
import { Event } from '../../../components/events'

const BlockEvent = ({ event }) => {
  if (!event) {
    return null
  }
  return <Event event={event} linkToEvent={true} displayOnlyFirstDate={true} />
}

export default BlockEvent
