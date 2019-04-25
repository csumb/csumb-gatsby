import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import { graphql } from 'gatsby'
import { Flex, Box } from '@rebass/grid/emotion'
import Container from 'components/container'
import moment from 'moment'
import { PublicEvent } from 'components/pages/event'
import EventsSidebar from 'components/events-sidebar'
import PageTitle from 'components/header/page-title'

class EventsPage extends React.Component {
  getEvents(events, featured) {
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
      if (!showEvent(node) || node.event.featured !== featured) {
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
    const featuredEvents = this.getEvents(
      this.props.data.allCsumbPage.edges,
      true
    )
    const events = this.getEvents(this.props.data.allCsumbPage.edges, false)
    return (
      <Layout>
        <SiteHeader path="/events">Events</SiteHeader>
        <Container topPadding>
          <PageTitle>Campus events</PageTitle>
          <Flex flexWrap="wrap">
            <Box width={[1, 3 / 4, 3 / 4]} pr={[0, 4, 4]}>
              {featuredEvents && featuredEvents.length > 0 && (
                <>
                  <h2>Featured Events</h2>
                  {featuredEvents.map(event => (
                    <PublicEvent
                      key={event.id}
                      event={event}
                      showTime={true}
                      showDate={true}
                      showFeatured={true}
                    />
                  ))}
                </>
              )}
              {events && (
                <>
                  {featuredEvents && featuredEvents.length > 0 && (
                    <h2>Upcoming events</h2>
                  )}
                  {events.map(event => (
                    <PublicEvent
                      key={event.id}
                      event={event}
                      showTime={true}
                      showDate={true}
                      showFeatured={false}
                    />
                  ))}
                </>
              )}
            </Box>
            <Box width={[1, 1 / 4, 1 / 4]}>
              <EventsSidebar
                categories={this.props.data.site.siteMetadata.eventCategories}
              />
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
    site {
      siteMetadata {
        eventCategories {
          name
          slug
        }
      }
    }
    allCsumbPage(
      filter: { event: { public: { eq: true }, description: { ne: null } } }
      sort: { fields: [event___featured, event___date_stamps] }
      limit: 25
    ) {
      edges {
        node {
          id
          title
          site
          pagePath
          event {
            description
            featured
            image
            category
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
