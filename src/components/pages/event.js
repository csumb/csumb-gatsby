import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import Container from 'components/container'
import { LeadParagraph, UnstyledList } from 'components/type'
import { colors } from 'style/theme'
import { ButtonLink } from 'components/button'
import Link from 'gatsby-link'
import styled from 'react-emotion'
import moment from 'moment'

const dateFormat = 'MMMM D, YYYY'

const getNextEventDate = dates => {
  let nextDate = false
  let lastDate = false
  let now = moment()
  dates.map(date => {
    const start = moment(date.start)
    if (!nextDate) {
      nextDate = start
    }
    const diff = start.diff(now)
    if (!lastDate || lastDate.diff(now) < diff) {
      lastDate = start
    }
    if (diff > -1 && (nextDate.diff(now) < -1 || diff < nextDate.diff(now))) {
      nextDate = start
    }
    return nextDate
  })
  if (!nextDate) {
    nextDate = lastDate
  }
  if (nextDate) {
    return nextDate.format(dateFormat)
  }
  return null
}

const EventDateItem = styled('p')`
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`

const Event = ({ event }) => (
  <>
    {event && event.times && (
      <>
        {event.title && <h2>{event.title}</h2>}
        <LeadParagraph>{event.description}</LeadParagraph>
        <Flex flexWrap="wrap">
          {event.image && (
            <Box width={[1, 4 / 12]} pr={[0, 4]}>
              <img
                src={event.image.replace('csumb.edu', 'edit.csumb.edu')}
                alt=""
              />
            </Box>
          )}
          <Box width={[1, 5 / 12]} pr={[0, 4]}>
            <EventDateItem>{getNextEventDate(event.dates)}</EventDateItem>
            <EventDateItem>
              {event.times.start} — {event.times.end}
            </EventDateItem>
            {event.location.type === 'on-campus' && (
              <p>
                <Link
                  to={`/directory/building/${event.location.building.code}`}
                >
                  {event.location.building.name}
                </Link>
                {event.location.room && (
                  <>
                    <br />
                    {event.location.room}
                  </>
                )}
              </p>
            )}
            {event.location.type === 'off-campus' && (
              <address>
                {event.location.address.organisation}
                <br />
                {event.location.address.street}
                <br />
                {event.location.address.premise}
                <br />
                {event.location.address.city}, {event.location.address.state}
                {'  '}
                {event.location.address.zip}
              </address>
            )}
            {event.location.type === 'online' && (
              <ButtonLink to={event.location.url}>Go to event</ButtonLink>
            )}
            {event.location.description && <p>{event.location.description}</p>}
            {event.cost_message && <p>{event.cost_message}</p>}
            {event.ticket && (
              <ButtonLink to={event.ticket.url}>
                {event.ticket.title}
              </ButtonLink>
            )}
          </Box>
          <Box width={[1, 3 / 12]}>
            {event.dates.length > 1 && (
              <>
                <h4>All dates</h4>
                <UnstyledList>
                  {event.dates.map(date => (
                    <li key={date.start}>
                      {moment(date.start).format(dateFormat)}
                    </li>
                  ))}
                </UnstyledList>
              </>
            )}
          </Box>
        </Flex>
      </>
    )}
  </>
)

const EventFeedItemDate = styled('p')`
  margin-bottom: 0.5rem;
  font-weight: bold;
`

const EventFeedItemTitle = styled('h3')`
  margin-bottom: 0.5rem;
`

const EventFeedItem = ({ title, link, times, dates, image, description }) => (
  <Flex flexWrap="wrap">
    <Box width={[1, 3 / 4]} pr={[0, 2]}>
      <Link to={`/${link}`}>
        <EventFeedItemTitle>{title}</EventFeedItemTitle>
      </Link>
      <EventFeedItemDate>
        {getNextEventDate(dates)} {times.start} — {times.end}
      </EventFeedItemDate>
      <p>{description}</p>
    </Box>
    <Box width={[1, 1 / 4]}>
      {image && (
        <Link to={`/${link}`}>
          <img src={image.replace('csumb.edu', 'edit.csumb.edu')} alt={title} />
        </Link>
      )}
    </Box>
  </Flex>
)

const EventPage = ({ event }) => (
  <Container>
    <Event event={event} />
  </Container>
)

const PublicEventWrapper = styled('div')`
  margin-bottom: 1.5rem;
  p,
  h3 {
    margin-bottom: 0.5rem;
  }
  a,
  a:visited {
    color: ${colors.black};
    text-decoration: none;
    &:hover {
      background: ${colors.primary.lightest};
    }
  }
`

const PublicEventLocation = styled('p')`
  font-weight: bold;
`

const PublicEventDate = styled('span')`
  display: inline-block;
  margin-right: 1.5rem;
`

const PublicEvent = ({ event, showDate, showTime }) => (
  <PublicEventWrapper>
    <Link to={event.pagePath}>
      <Flex flexWrap="wrap">
        <Box width={[0, 3 / 12, 3 / 12]} pr={[0, 4, 4]}>
          {event.event.image && (
            <img
              src={event.event.image.replace('csumb.edu', 'edit.csumb.edu')}
              alt=""
            />
          )}
        </Box>
        <Box width={[1, 9 / 12, 9 / 12]}>
          <h3>{event.title}</h3>
          {(showDate || showTime) && (
            <p>
              {showDate && (
                <PublicEventDate>
                  {event.event.date_stamps.map(stamp => (
                    <>{moment.unix(stamp.start_stamp).format(dateFormat)}</>
                  ))}
                </PublicEventDate>
              )}
              {showTime && (
                <>
                  {event.event.times.start} — {event.event.times.end}
                </>
              )}
            </p>
          )}

          <PublicEventLocation>
            {event.event.location.type === 'on-campus' && (
              <>
                {event.event.location.building.name}
                {event.event.location.room && (
                  <>
                    {', '}
                    {event.event.location.room}
                  </>
                )}
              </>
            )}
          </PublicEventLocation>

          <p>{event.event.description}</p>
        </Box>
      </Flex>
    </Link>
  </PublicEventWrapper>
)

export { Event, EventPage, EventFeedItem, PublicEvent }
