import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import Container from 'components/container'
import { LeadParagraph } from 'components/type'

const Event = ({ event }) => (
  <>
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
)

const EventPage = ({ event }) => (
  <Container>
    <Event event={event} />
  </Container>
)

export { EventPage }
