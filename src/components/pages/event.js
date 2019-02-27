import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import Container from 'components/container'
import { LeadParagraph } from 'components/type'
import { colors } from 'style/theme'
import Link from 'gatsby-link'
import LinkInspect from 'components/link-inspect'
import styled from 'react-emotion'
import moment from 'moment'

const Event = ({ event }) => (
  <>
    {event && event.times && (
      <>
        {event.title && <h2>{event.title}</h2>}
        <LeadParagraph>{event.description}</LeadParagraph>
        <Flex flexWrap="wrap">
          <Box width={[1, 1 / 3]} px={2}>
            {event.dates.map(date => (
              <p>{date.start}</p>
            ))}
            <p>
              {event.times.start} — {event.times.end}
            </p>
          </Box>
        </Flex>
      </>
    )}
  </>
)

const EventFeedItem = ({ event }) => (
  <>
    <LinkInspect to={event.link}>
      <h4>{event.title}</h4>
    </LinkInspect>
  </>
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
          {event.event.image && <img src={event.event.image} alt="" />}
        </Box>
        <Box width={[1, 9 / 12, 9 / 12]}>
          <h3>{event.title}</h3>
          {(showDate || showTime) && (
            <p>
              {showDate && (
                <PublicEventDate>
                  {event.event.date_stamps.map(stamp => (
                    <>{moment.unix(stamp.start_stamp).format('MMMM D, YYYY')}</>
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
