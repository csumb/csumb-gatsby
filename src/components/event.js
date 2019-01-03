import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import Container from 'components/container'
import { LeadParagraph } from 'components/type'
import Link from 'gatsby-link'

const Event = ({ event }) => (
  <>
    {event.times && (
      <>
        {event.title && (
          <h2>{event.title}</h2>
        )}
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

export { Event, EventPage, EventFeedItem }
