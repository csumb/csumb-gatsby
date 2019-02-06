import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import Container from 'components/container'
import { LeadParagraph } from 'components/type'
import { colors } from 'components/styles/theme'
import Link from 'gatsby-link'
import styled from 'react-emotion'

const eventStyle = `
  margin-bottom: 1.5rem;
`

const FeaturedEventWrapper = styled('div')`
  ${eventStyle};
  background: ${colors.primary.darkest};
  padding: 1rem;
  color: ${colors.white};
`

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
  <FeaturedEventWrapper>
    <h2>{event.title}</h2>
    <Flex flexWrap="wrap">
      <Box width={[0, 1 / 4, 1 / 4]} pr={[0, 2, 2]}>
        image
      </Box>
    </Flex>
  </FeaturedEventWrapper>
)

const RegularEventWrapper = styled('div')`
  margin-bottom: 1.5rem;
  a {
    color: ${colors.black};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const RegularEvent = ({ event }) => (
  <RegularEventWrapper>
    <h4>
      <Link to={`${event.site}/${event.pagePath}`}>{event.title}</Link>
    </h4>
    <p>{event.event.description}</p>
  </RegularEventWrapper>
)

export { Event, EventPage, EventFeedItem, FeaturedEvent, RegularEvent }
