import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/site-header'
import { graphql } from 'gatsby'
import Container from 'components/container'

class EventsPage extends React.Component {
  render() {
    return (
      <Layout>
        <SiteHeader path="/events">Events</SiteHeader>
        <Container />
      </Layout>
    )
  }
}

export default EventsPage

export const query = graphql`
  {
    allCsumbContentPage(filter: { event: { description: { ne: null } } }) {
      edges {
        node {
          title
          site
          pageContent
          event {
            description
            image
            cost
            link
            button
            ticket {
              url
              title
            }
            cost_message
            times {
              start
              end
            }
            dates {
              start
              end
              value
              value2
              timezone
              timezone_db
              date_type
            }
          }
        }
      }
    }
  }
`
