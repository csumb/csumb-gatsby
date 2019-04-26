import React from 'react'
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
  DashboardIntro,
} from 'components/dashboard'
import { navigate } from '@reach/router'

class DashboardPage extends React.Component {
  state = {
    isMobile: false,
    activeTab: 'messages',
  }

  componentDidMount() {
    const mobileBreakpoint = 830
    const that = this

    const setWindowSize = () => {
      that.setState({
        isMobile: window.innerWidth <= mobileBreakpoint,
      })
    }

    window.addEventListener('resize', setWindowSize)

    setWindowSize()
  }

  redirectApplicant(user) {
    if (
      user &&
      !user.anonymous &&
      user._isApplicant &&
      !user.isEmployee &&
      !user.isStudent
    ) {
      navigate('/account/applicant-status')
    }
  }

  render() {
    const { data } = this.props
    const { isMobile, activeTab } = this.state
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
                      <DashboardIntro />

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
                        <DashboardIntro />

                        <Container topPadding>
                          <DashboardContent user={context.user} />
                        </Container>
                      </section>
                    </>
                  )}
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
