import React, { Component } from 'react'
import Container from 'components/common/container'
import { Layout, PageTitle, SiteHeader, SiteNavigation } from 'components/layouts/default'
import { UserContext } from 'components/contexts/user'
import { DashboardContent, DashboardMobileToolbar } from 'components/dashboard'
import BreakpointContext from 'components/contexts/breakpoint'
import ReturnLink from 'components/common/return-link'

class DashboardArchivePage extends Component {
  state = {
    activeTab: 'messages',
  }

  render() {
    const { activeTab } = this.state
    return (
      <Layout pageTitle="Dashboard">
        <SiteHeader path="/dashboard">Dashboard archive</SiteHeader>
        <UserContext.Consumer>
          {context => (
            <>
              {context.user && (
                <>
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
                              archivedContent={true}
                            />
                          </>
                        ) : (
                          <>
                            <section>
                              <Container topPadding>
                                <p>
                                  <ReturnLink to="/dashboard">
                                    Return to dashboard
                                  </ReturnLink>
                                </p>

                                <DashboardContent
                                  user={context.user}
                                  archivedContent={true}
                                />
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

export default DashboardArchivePage
