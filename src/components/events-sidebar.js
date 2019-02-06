import React from 'react'
import Calendar from 'components/calendar'
import { navigate } from 'gatsby'

const EventsSidebar = () => (
  <>
    <Calendar
      next2Label={null}
      prev2Label={null}
      onChange={event => {
        navigate(
          `/events/${event.getFullYear()}/${event.getMonth() +
            1}/${event.getDate()}`
        )
      }}
    />
  </>
)

export default EventsSidebar
