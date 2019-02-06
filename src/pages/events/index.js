import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import { graphql } from 'gatsby'
import { Flex, Box } from '@rebass/grid/emotion'
import Container from 'components/container'
import moment from 'moment'
import { FeaturedEvent } from 'components/pages/event'
import EventsSidebar from 'components/events-sidebar'

class EventsPage extends React.Component {
  getEvents(events) {
    const timeCutoff = moment()
      .subtract(1, 'day')
      .unix()
    const results = []

    const showEvent = event => {
      let show = false
      event.event.date_stamps.forEach(stamp => {
        if (stamp.start_stamp > timeCutoff) {
          show = true
        }
      })
      return show
    }

    events.forEach(({ node }) => {
      if (!showEvent(node)) {
        return
      }
      results.push(node)
    })

    const getEarliestDate = event => {
      let earliest = false
      event.event.date_stamps.forEach(date => {
        if (
          !earliest ||
          (date.start_stamp > timeCutoff && date.start_stamp < earliest)
        ) {
          earliest = date.start_stamp
        }
      })
      return earliest
    }

    results.sort((a, b) => {
      return getEarliestDate(a) > getEarliestDate(b)
    })

    return results
  }

  render() {
    const events = this.getEvents(this.props.data.allCsumbPage.edges)
    return (
      <Layout>
        <SiteHeader path="/events">Events</SiteHeader>
        <Container topPadding>
          <Flex flexWrap="wrap">
            <Box width={[1, 3 / 4, 3 / 4]} pr={[0, 2, 2]}>
              <h2>Featured events</h2>
              {events && (
                <>
                  {events.map(event => (
                    <FeaturedEvent key={event.id} event={event} />
                  ))}
                </>
              )}
            </Box>
            <Box width={[1, 1 / 4, 1 / 4]}>
              <EventsSidebar />
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default EventsPage

export const query = graphql`
  {
    allCsumbPage(
      filter: {
        event: {
          public: { eq: true }
          featured: { eq: true }
          description: { ne: null }
        }
      }
      sort: { fields: [event___date_stamps] }
    ) {
      edges {
        node {
          id
          title
          site
          event {
            description
            featured
            image
            location {
              type
              room
              building {
                code
                name
              }
            }
            ticket {
              url
              title
            }
            cost_message
            dates {
              start
              end
            }
            date_stamps {
              start_stamp
              end_stamp
            }
            times {
              start
              end
            }
          }
        }
      }
    }
  }
`
