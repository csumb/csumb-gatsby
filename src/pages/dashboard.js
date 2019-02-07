import React from 'react'
import Container from 'components/container'
import Layout from 'components/layouts/default'
import { UserContext } from 'components/contexts/user'
import SiteHeader from 'components/header/site-header'
import { graphql } from 'gatsby'
import { DashboardApps, DashboardContent } from 'components/pages/dashboard'

class DashboardPage extends React.Component {
  state = {
    isMobile: false,
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

  render() {
    const { data } = this.props
    const { isMobile } = this.state
    return (
      <Layout pageTitle="Dashboard">
        <SiteHeader path="/dashboard">Dashboard</SiteHeader>

        <DashboardApps apps={data.allCsumbApp.edges} isMobile={isMobile} />
        <UserContext.Consumer>
          {context => (
            <>
              {context.user && (
                <section>
                  <Container topPadding>
                    <DashboardContent user={context.user} isMobile={isMobile} />
                  </Container>
                </section>
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
