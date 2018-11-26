import React from 'react'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import Layout from 'components/layouts/default'
import { UserContext } from 'components/contexts/user'
import SiteHeader from 'components/layouts/components/site-header'
import {
  DashboardEvents,
  DashboardMessages,
  DashboardApps,
} from 'components/dashboard'

const DashboardPage = () => (
  <Layout pageTitle="Dashboard">
    <SiteHeader path="/dashboard">Dashboard</SiteHeader>

    <DashboardApps />
    <UserContext.Consumer>
      {context => (
        <>
          {context.user && (
            <>
              <Container topPadding>
                <Flex flexWrap="wrap">
                  <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
                    <h2>Events</h2>
                    <DashboardEvents user={context.user} />
                  </Box>
                  <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
                    <h2>Messages</h2>
                    <DashboardMessages user={context.user} />
                  </Box>
                </Flex>
              </Container>
            </>
          )}
        </>
      )}
    </UserContext.Consumer>
  </Layout>
)

export default DashboardPage
