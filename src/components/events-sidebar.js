import React from 'react'
import Calendar from 'components/calendar'

const EventsSidebar = () => (
  <>
    <Calendar
      next2Label={null}
      prev2Label={null}
      onChange={event => {
        window.location.href = `/events/${event.getFullYear()}/${event.getMonth() +
          1}/${event.getDate()}`
      }}
    />
  </>
)

export default EventsSidebar
