import React, { Component } from 'react'
import { Layout, PageTitle, SiteHeader, SiteNavigation } from 'components/layouts/default'
import Container from 'components/common/container'
import { graphql } from 'gatsby'

import RichText from 'components/rich-text'

const contentfulKey = process.env.GATSBY_CSUMB_EMERGENCY_KEY
const contentfulSpace = '348vmopvao05'

const EmergencyNotice = ({ title, content }) => (
  <>
    <h2>{title}</h2>
    <RichText richText={content} />
  </>
)

class UPDEmergencyPage extends Component {
  state = {
    alerts: false,
  }

  componentDidMount() {
    fetch(
      `https://cdn.contentful.com/spaces/${contentfulSpace}/environments/master/entries?access_token=${contentfulKey}&content_type=notice&order=-sys.updatedAt`
    )
      .then(response => {
        return response.json()
      })
      .then(alerts => {
        this.setState({
          alerts: alerts.items,
        })
      })
  }

  render() {
    const { data } = this.props
    const { alerts } = this.state
    return (
      <Layout pageTitle="Emergency updates">
        <SiteHeader path="/police">University Police</SiteHeader>
        {data.allCsumbNavigation &&
          data.allCsumbNavigation.edges &&
          data.allCsumbNavigation.edges[0] && (
            <SiteNavigation
              navigation={data.allCsumbNavigation.edges[0].node.navigation}
            />
          )}
        <Container topPadding>
          <PageTitle>Emergency updates</PageTitle>
          {alerts && (
            <>
              {alerts.map(alert => (
                <EmergencyNotice
                  key={alert.sys.id}
                  content={alert.fields.content}
                  title={alert.fields.title}
                />
              ))}
            </>
          )}
          <p style={{ marginTop: '3rem' }}>
            <small>
              <a
                href="https://app.contentful.com/spaces/348vmopvao05/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Edit this page
              </a>
            </small>
          </p>
        </Container>
      </Layout>
    )
  }
}

export default UPDEmergencyPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "police" } }) {
      edges {
        node {
          navigation
        }
      }
    }
  }
`
