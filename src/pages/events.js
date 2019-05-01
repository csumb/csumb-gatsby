import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import { graphql } from 'gatsby'
import { Flex, Box } from '@rebass/grid/emotion'
import Container from 'components/common/container'
import { PublicEvent } from 'components/events'
import EventsSidebar from 'components/events/sidebar'
import PageTitle from 'components/layouts/sections/header/page-title'

class EventsPage extends React.Component {
  render() {
    const events = this.props.data.allCsumbPage.edges
    let featuredEvents = false
    events.forEach(({ node }) => {
      if (node.event.featured) {
        featuredEvents = true
      }
    })
    return (
      <Layout>
        <SiteHeader path="/events">Events</SiteHeader>
        <Container topPadding>
          <PageTitle>Campus events</PageTitle>
          <Flex flexWrap="wrap">
            <Box width={[1, 3 / 4, 3 / 4]} pr={[0, 4, 4]}>
              {featuredEvents && (
                <>
                  <h2>Featured Events</h2>
                  {events.map(({ node }) => (
                    <React.Fragment key={node.id}>
                      {node.event.featured && (
                        <PublicEvent
                          event={node}
                          showTime={true}
                          showDate={true}
                          showFeatured={true}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}
              {events && (
                <>
                  {featuredEvents && <h2>Upcoming events</h2>}
                  {events.map(({ node }) => (
                    <React.Fragment key={node.id}>
                      {!node.event.featured && (
                        <PublicEvent
                          event={node}
                          showTime={true}
                          showDate={true}
                          showFeatured={false}
                        />
                      )}
                    </React.Fragment>
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
      filter: { event: { _passedEvent: { eq: false }, public: { eq: true } } }
      sort: { fields: [event____sortDate], order: ASC }
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
