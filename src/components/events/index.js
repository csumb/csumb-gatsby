import React from 'react'
import { Flex, Box } from '../common/grid'
import Container from '../common/container'
import { LeadParagraph, UnstyledList } from '../common/type'
import { colors } from '../../style'
import { ButtonLink } from '../common/button'
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

const EventDateItem = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`

const EventWrapper = styled.div`
  margin: 1rem 0;
`

const EventLocation = ({ location }) => (
  <>
    {location.type === 'on-campus' && (
      <p>
        <Link
          to={`/directory/building/${location.building.code
            .toLowerCase()
            .trim()}`}
        >
          {location.building.name}
        </Link>
        {location.room && (
          <>
            <br />
            Room {location.room}
          </>
        )}
      </p>
    )}
    {location.type === 'off-campus' && (
      <address>
        {location.address.organisation && (
          <>
            {location.address.organisation}
            <br />
          </>
        )}
        {location.address.street}
        <br />
        {location.address.premise && (
          <>
            {location.address.premise}
            <br />
          </>
        )}
        {location.address.city}, {location.address.state}
        {'  '}
        {location.address.zip}
      </address>
    )}
    {location.type === 'online' && (
      <ButtonLink to={location.url}>Go to event</ButtonLink>
    )}
    {location.description && <p>{location.description}</p>}
  </>
)

const Event = ({ event, linkToEvent, displayOnlyFirstDate }) => (
  <>
    {event && event.times && (
      <EventWrapper>
        {event.title && (
          <h2>
            {linkToEvent ? (
              <Link to={event.link}>{event.title}</Link>
            ) : (
              <>{event.title}</>
            )}
          </h2>
        )}
        <LeadParagraph>{event.description}</LeadParagraph>
        <Flex>
          {event.image && (
            <Box width={[1, 4 / 12]} pr={[0, 4]}>
              <img
                src={event.image.replace('/csumb.edu/', '/edit.csumb.edu/')}
                alt=""
              />
            </Box>
          )}
          <Box width={[1, 5 / 12]} pr={[0, 4]}>
            <EventDateItem>{getNextEventDate(event.dates)}</EventDateItem>
            <EventDateItem>
              {event.times.start} — {event.times.end}
            </EventDateItem>
            <EventLocation {...event} />
            {event.cost_message && <p>{event.cost_message}</p>}
            {event.ticket && (
              <ButtonLink to={event.ticket.url}>
                {event.ticket.title}
              </ButtonLink>
            )}
          </Box>
          <Box width={[1, 3 / 12]}>
            {event.dates.length > 1 && displayOnlyFirstDate !== true && (
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
      </EventWrapper>
    )}
  </>
)

const EventFeedItemDate = styled.p`
  margin-bottom: 0.5rem;
  font-weight: bold;
`

const EventFeedItemTitle = styled.h3`
  margin-bottom: 0.5rem;
`

const EventFeedItem = ({
  title,
  link,
  times,
  dates,
  location,
  image,
  description,
}) => (
  <Flex>
    <Box width={[1, 3 / 4]} pr={[0, 2]}>
      <Link to={`/${link}`}>
        <EventFeedItemTitle>{title}</EventFeedItemTitle>
      </Link>
      <EventFeedItemDate>
        {getNextEventDate(dates)} {times.start} — {times.end}
      </EventFeedItemDate>
      <EventLocation location={location} />
      <p>{description}</p>
    </Box>
    <Box width={[1, 1 / 4]}>
      {image && (
        <Link to={`/${link}`}>
          <img
            src={image.replace('/csumb.edu/', '/edit.csumb.edu/')}
            alt={title}
          />
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

const PublicEventWrapper = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  ${props =>
    props.featured &&
    `
    background: ${colors.primary.darkest};
    color: ${colors.white};
    a {
      color: ${colors.white} !important;
    }
  `}
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

const PublicEventLocation = styled.p`
  font-weight: bold;
`

const PublicEventDate = styled.span`
  display: inline-block;
  margin-right: 1.5rem;
`

const PublicEvent = ({ event, showDate, showTime, showFeatured }) => (
  <PublicEventWrapper featured={event.event.featured && showFeatured}>
    <Link to={event.pagePath}>
      <Flex>
        <Box width={[0, 3 / 12, 3 / 12]} pr={[0, 4, 4]}>
          {event.event.image && (
            <img
              src={event.event.image.replace('/csumb.edu/', '/edit.csumb.edu/')}
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
