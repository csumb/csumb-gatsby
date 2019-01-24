import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import { graphql } from 'gatsby'
import Container from 'components/container'
import moment from 'moment'
import { FeaturedEvent, RegularEvent } from 'components/pages/event'

class EventsPage extends React.Component {

  getEvents(events) {
    const timeCutoff = moment().subtract(1, 'day').unix()
    const regularEvents = []
    const featuredEvents = []
    const showEvent = (event) => {
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
      if (node.event.featured) {
        featuredEvents.push(node)
      }
      else {
        regularEvents.push(node)
      }
    })

    const getEarliestDate = (event) => {
      let earliest = false
      event.event.date_stamps.forEach(date => {
        if (!earliest || (date.start_stamp > timeCutoff && date.start_stamp < earliest)) {
          earliest = date.start_stamp
        }
      })
      return earliest
    }

    const sortEvents = (a, b) => {
      return (getEarliestDate(a) > getEarliestDate(b))
    }

    regularEvents.sort(sortEvents)
    featuredEvents.sort(sortEvents)

    return { regular: regularEvents, featured: featuredEvents }
  }

  render() {
    const { featured, regular } = this.getEvents(this.props.data.allCsumbPage.edges)
    return (
      <Layout>
        <SiteHeader path="/events">Events</SiteHeader>
        <Container>
          {featured && (
            <>
              {featured.map(event => (
                <FeaturedEvent key={event.id} event={event} />
              ))}
            </>
          )}
          {regular && (
            <>
              <h2>Today's events</h2>
              {regular.map(event => (
                <RegularEvent key={event.id} event={event} />
              ))}
            </>
          )}
        </Container>
      </Layout>
    )
  }
}

export default EventsPage

export const query = graphql`
{
  allCsumbPage(filter: 
    {event: {
      public: {eq: true},
      description: {ne: null}}
    }
    sort:{fields:[event___date_stamps]}) {
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
