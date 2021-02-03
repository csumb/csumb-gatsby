import React, { Component } from 'react'
import {
  Layout,
  PageTitle,
  SiteHeader,
  SiteNavigation,
} from '../../components/layouts/default'
import Container from '../../components/common/container'
import { graphql } from 'gatsby'
import Loading from '../../components/common/loading'
import Breadcrumbs from '../../components/layouts/sections/header/breadcrumbs'

class ITAlertsPage extends Component {
  alertRef = React.createRef()

  state = {
    alerts: false,
  }

  componentDidMount() {
    if (typeof window === 'undefined') {
      return
    }
    const that = this
    const script = window.document.createElement('script')
    script.src = '//csumbalerts.tumblr.com/api/read/json'
    script.async = false
    this.alertRef.current.parentNode.insertBefore(script, this.alertRef.current)
    script.addEventListener('load', function() {
      that.setState({
        alerts: window.tumblr_api_read,
      })
    })
  }

  render() {
    const { data } = this.props
    const { alerts } = this.state
    const posts = []
    if (alerts && alerts.posts) {
      alerts.posts.forEach(alert => {
        if (alert.tags) {
          alert.tags.forEach(tag => {
            if (tag === 'active') {
              posts.push(alert)
            }
          })
        }
      })
    }
    const breadcrumbs =
      '[{ "href": "/", "title": "CSUMB Home" }, {"href": "/it", "title": "Information Technology"}]'
    const currentPage = 'Alerts'
    const currentUrl = this.props.location.pathname
    return (
      <Layout pageTitle="Alerts">
        <SiteHeader path="/it">Information Technology</SiteHeader>
        {data.allCsumbNavigation &&
          data.allCsumbNavigation.edges &&
          data.allCsumbNavigation.edges[0] && (
            <SiteNavigation
              navigation={data.allCsumbNavigation.edges[0].node.navigation}
            />
          )}
        <Container topPadding>
          <Breadcrumbs
            breadcrumbs={breadcrumbs}
            currentPage={currentPage}
            currentUrl={currentUrl}
          />
          <PageTitle>Alerts</PageTitle>
          <p>
            Below are the <strong>active</strong> alerts currently affecting
            users at CSUMB:
          </p>
          <div ref={this.alertRef}>
            {posts ? (
              <>
                {posts.map(alert => (
                  <div id={alert.slug}>
                    <h3>{alert['regular-title']}</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: alert['regular-body'],
                      }}
                    />
                  </div>
                ))}
              </>
            ) : (
              <Loading>Loading alerts</Loading>
            )}
          </div>
        </Container>
      </Layout>
    )
  }
}

export default ITAlertsPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "it" } }) {
      edges {
        node {
          navigation
        }
      }
    }
  }
`
