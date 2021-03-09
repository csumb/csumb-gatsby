import React, { Component } from 'react'
import Container from '../../components/common/container'
import { Layout, SiteHeader } from '../../components/layouts/default'
import { UserContext } from '../../components/contexts/user'
import { graphql } from 'gatsby'
import Serenova from '../../components/utilities/serenova'
import { ButtonLink } from '../../components/common/button'
import {
  DashboardApps,
  DashboardContent,
  DashboardMobileToolbar,
} from '../../components/dashboard'
import { navigate } from '@reach/router'
import BreakpointContext from '../../components/contexts/breakpoint'
import PageFeedbackContext from '../../components/contexts/page-feedback'

class TestDashboardPage extends Component {
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
      navigate('https://scratchy-csumb.cs92.force.com/login?so=00D3F000000FWRw')
    }
  }

  login(address) {
    if (typeof window !== 'undefined') {
      window.location.href = address
    }
  }

  render() {
    const { data } = this.props
    const { activeTab } = this.state

    return (
      <PageFeedbackContext.Provider
        value={{
          email: 'webfolk@csumb.edu',
          title: 'Dashboard',
          url: '/dashboard',
        }}
      >
        <Layout pageTitle="Dashboard">
          <Serenova site="dashboard" />
          <SiteHeader path="/dashboard">Dashboard</SiteHeader>
          <UserContext.Consumer>
            {context => (
              <>
                {context.user && !context.user.anonymous && (
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
                                disableAlumni={
                                  data.site.siteMetadata.disableAlumni
                                }
                                showTitleNineMessage={
                                  data.site.siteMetadata.showTitleNineMessage
                                }
                              />
                            </>
                          ) : (
                            <>
                              <DashboardApps
                                apps={data.allCsumbApp.edges}
                                user={context.user}
                              />
                              <section>
                                <Container topPadding>
                                  <DashboardContent
                                    user={context.user}
                                    disableAlumni={
                                      data.site.siteMetadata.disableAlumni
                                    }
                                    showTitleNineMessage={
                                      data.site.siteMetadata
                                        .showTitleNineMessage
                                    }
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
                {context.user && context.user.anonymous && (
                  <Container>
                    {this.login(data.site.siteMetadata.okta.login)}
                    <p>You are not logged in</p>
                    <ButtonLink to={data.site.siteMetadata.okta.login}>
                      Log in
                    </ButtonLink>
                  </Container>
                )}
              </>
            )}
          </UserContext.Consumer>
        </Layout>
      </PageFeedbackContext.Provider>
    )
  }
}

export default TestDashboardPage

export const query = graphql`
  {
    site {
      siteMetadata {
        showTitleNineMessage
        disableAlumni
        okta {
          login
        }
      }
    }
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
