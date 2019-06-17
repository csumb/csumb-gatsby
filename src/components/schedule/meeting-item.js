import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import moment from 'moment'
import weekDays from './week-days'

const MeetingItemDate = styled.h4`
  margin: 0;
`

const MeetingItem = props => {
  let meetingDays = []
  weekDays.forEach(day => {
    if (props[day.short] === 'Y') {
      meetingDays.push(day.day)
    }
  })

  const start = moment(props.MEETING_TIME_START)
  const end = moment(props.MEETING_TIME_END)
  let startDate = false
  let endDate = false
  if (props._separateDates) {
    startDate = moment(props.MEETING_DATE_START)
    endDate = moment(props.MEETING_DATE_END)
  }
  return (
    <li>
      {parseInt(props.MEETING_BLDG) > 990 ? (
        <>
          <em>Arranged</em>
          {props.showSeparateDates && props._separateDates && (
            <MeetingItemDate>
              {startDate.format('MMMM D YYYY')}
              {props.MEETING_DATE_END !== props.MEETING_DATE_START && (
                <> to {endDate.format('MMMM D YYYY')}</>
              )}
            </MeetingItemDate>
          )}
        </>
      ) : (
        <>
          {props.showSeparateDates && props._separateDates && (
            <MeetingItemDate>
              {startDate.format('MMMM D YYYY')}
              {props.MEETING_DATE_END !== props.MEETING_DATE_START && (
                <> to {endDate.format('MMMM D YYYY')}</>
              )}
            </MeetingItemDate>
          )}
          {meetingDays.length && meetingDays.join(', ')} {start.format('h:mma')}{' '}
          to {end.format('h:mma')}
          {props.showLocation && props._building && (
            <>
              <br />
              <Link to={`/directory/building/${props._building.code}`}>
                {props._building.buildingName}
              </Link>{' '}
              - Room {props.MEETING_RM}
            </>
          )}
        </>
      )}
    </li>
  )
}

export default MeetingItem
