import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import { Flex, Box } from '@rebass/grid/emotion'
import Container from 'components/container'
import { RegularEvent } from 'components/pages/event'
import EventsSidebar from 'components/events-sidebar'

class EventsPage extends React.Component {
  render() {
    const { events, date } = this.props.pageContext
    return (
      <Layout>
        <SiteHeader path="/events">Events</SiteHeader>
        <Container topPadding>
          <Flex flexWrap="wrap">
            <Box width={[1, 3 / 4, 3 / 4]} pr={[0, 4, 4]}>
              {events.map(event => (
                <RegularEvent event={event} />
              ))}
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
