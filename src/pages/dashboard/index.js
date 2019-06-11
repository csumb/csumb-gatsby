import React, { Component } from 'react'
import Container from 'components/common/container'
import { Layout, SiteHeader } from 'components/layouts/default'
import { UserContext } from 'components/contexts/user'
import { graphql } from 'gatsby'
import Olark from 'components/utilities/olark'
import styled from '@emotion/styled'
import {
  DashboardApps,
  DashboardContent,
  DashboardMobileToolbar,
} from 'components/dashboard'
import { navigate } from '@reach/router'
import Link from 'gatsby-link'
import BreakpointContext from 'components/contexts/breakpoint'

const ArchivedMessages = styled.p`
  text-align: right;
  margin: 1.5rem 0;
`

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

  login(data) {
    navigate(data.site.siteMetadata.okta.login)
  }

  render() {
    const { data } = this.props
    const { activeTab } = this.state
    let siteOlarkId = ''
    if (data.site.siteMetadata.perSiteOlarkIds) {
      data.site.siteMetadata.perSiteOlarkIds.forEach(({ site, code }) => {
        if (site === 'dashboard') {
          siteOlarkId = code
        }
      })
    }
    return (
      <Layout pageTitle="Dashboard">
        {siteOlarkId && <Olark siteId={siteOlarkId} />}
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
                                <DashboardContent user={context.user} />
                                <ArchivedMessages>
                                  <Link to="/dashboard/archive">
                                    View archived messages &amp; events
                                  </Link>
                                </ArchivedMessages>
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
                <>{this.login(data)}</>
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
    site {
      siteMetadata {
        okta {
          login
        }
        perSiteOlarkIds {
          site
          code
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
