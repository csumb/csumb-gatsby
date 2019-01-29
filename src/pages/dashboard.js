import React from 'react'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import Layout from 'components/layouts/default'
import { UserContext } from 'components/contexts/user'
import SiteHeader from 'components/header/site-header'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { colors } from 'components/styles/theme'
import {
  DashboardEvents,
  DashboardMessages,
  DashboardApps,
} from 'components/pages/dashboard'

const DashboardContainer = styled('section')`
  background: ${colors.primary.lightest};
`

const DashboardPage = ({ data }) => (
  <Layout pageTitle="Dashboard">
    <SiteHeader path="/dashboard">Dashboard</SiteHeader>

    <DashboardApps apps={data.allCsumbApp.edges} />
    <UserContext.Consumer>
      {context => (
        <>
          {context.user && (
            <DashboardContainer>
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
            </DashboardContainer>
          )}
        </>
      )}
    </UserContext.Consumer>
  </Layout>
)

export default DashboardPage

export const query = graphql`
  {
    allCsumbApp {
      edges {
        node {
          url
          name
        }
      }
    }
  }
`
