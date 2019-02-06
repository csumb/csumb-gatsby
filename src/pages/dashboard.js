import React from 'react'
import Container from 'components/container'
import Layout from 'components/layouts/default'
import { UserContext } from 'components/contexts/user'
import SiteHeader from 'components/header/site-header'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { colors } from 'components/styles/theme'
import { DashboardApps, DashboardContent } from 'components/pages/dashboard'

const DashboardContainer = styled('section')`
  background: ${colors.primary.lightest};
`

class DashboardPage extends React.Component {
  render() {
    const { data } = this.props
    return (
      <Layout pageTitle="Dashboard">
        <SiteHeader path="/dashboard">Dashboard</SiteHeader>

        <DashboardApps apps={data.allCsumbApp.edges} />
        <UserContext.Consumer>
          {context => (
            <>
              {context.user && (
                <DashboardContainer>
                  <Container topPadding>
                    <DashboardContent user={context.user} />
                  </Container>
                </DashboardContainer>
              )}
            </>
          )}
        </UserContext.Consumer>
      </Layout>
    )
  }
}

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
