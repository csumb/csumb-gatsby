import React, { Component } from 'react'
import Container from 'components/common/container'
import Layout from 'components/layouts/default'
import { UserContext } from 'components/contexts/user'
import SiteHeader from 'components/layouts/sections/header/site-header'
import { graphql } from 'gatsby'
import Olark from 'components/utilities/olark'
import {
  DashboardApps,
  DashboardContent,
  DashboardMobileToolbar,
} from 'components/dashboard'
import { navigate } from '@reach/router'
import BreakpointContext from 'components/contexts/breakpoint'

class DashboardPage extends Component {
  state = {
    activeTab: 'messages',
  }

  redirectApplicant(user) {
    if (
      user &&
      !user.anonymous &&
      user._isApplicant &&
      !user._isEmployee &&
      !user._isStudent
    ) {
      navigate('/account/applicant-status')
    }
  }

  render() {
    const { data } = this.props
    const { activeTab } = this.state
    return (
      <Layout pageTitle="Dashboard">
        <Olark />
        <SiteHeader path="/dashboard">Dashboard</SiteHeader>
        <UserContext.Consumer>
          {context => (
            <>
              {context.user && (
                <>
                  {this.redirectApplicant(context.user)}
                  <BreakpointContext.Consumer>
                    {({ isMobile }) => (
                      <>
                        {isMobile ? (
                          <>
                            <DashboardMobileToolbar>
                              <Container>
                                <button
                                  onClick={() => {
                                    this.setState({ activeTab: 'messages' })
                                  }}
                                >
                                  Messages
                                </button>
                                <button
                                  onClick={() => {
                                    this.setState({ activeTab: 'events' })
                                  }}
                                >
                                  Events
                                </button>
                                <button
                                  onClick={() => {
                                    this.setState({ activeTab: 'apps' })
                                  }}
                                >
                                  Apps
                                </button>
                              </Container>
                            </DashboardMobileToolbar>

                            <DashboardContent
                              user={context.user}
                              mobileTab={activeTab}
                              isMobile={true}
                              moreApps={data.allCsumbApp.edges}
                            />
                          </>
                        ) : (
                          <>
                            <DashboardApps apps={data.allCsumbApp.edges} />
                            <section>
                              <Container topPadding>
                                <DashboardContent user={context.user} />
                              </Container>
                            </section>
                          </>
                        )}
                      </>
                    )}
                  </BreakpointContext.Consumer>
                </>
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
