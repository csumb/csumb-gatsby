import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import Container from 'components/container'
import { LeadParagraph } from 'components/type'
import Link from 'gatsby-link'
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
    <Link to={event.link}>
      <h4>{event.title}</h4>
    </Link>
  </>
)

const EventPage = ({ event }) => (
  <Container>
    <Event event={event} />
  </Container>
)

const FeaturedEvent = ({ event }) => (
  <h2>{event.title}</h2>
)

const RegularEvent = ({ event }) => (
  <Flex flexWrap="wrap">
    <Box width={[1, 3 / 4, 9 / 12]} pr={[0, 2, 2]}>
      <h3><Link to={`${event.site}/${event.pagePath}`}>{event.title}</Link></h3>

    </Box>
  </Flex>
)

export { Event, EventPage, EventFeedItem, FeaturedEvent, RegularEvent }
