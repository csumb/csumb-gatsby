import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import { Flex, Box } from '@rebass/grid/emotion'
import Container from 'components/common/container'
import { PublicEvent } from 'components/events'
import PageTitle from 'components/layouts/sections/header/page-title'
import EventsSidebar from 'components/events/sidebar'

class EventsPage extends Component {
  render() {
    const { events, category, categories } = this.props.pageContext
    return (
      <Layout>
        <SiteHeader path="/events">Events</SiteHeader>
        <Container topPadding>
          <PageTitle>{category} events</PageTitle>
          <Flex flexWrap="wrap">
            <Box width={[1, 3 / 4, 3 / 4]} pr={[0, 4, 4]}>
              {events.map(event => (
                <PublicEvent event={event} showDate={true} showTime={true} />
              ))}
            </Box>
            <Box width={[1, 1 / 4, 1 / 4]}>
              <EventsSidebar categories={categories} />
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default EventsPage
