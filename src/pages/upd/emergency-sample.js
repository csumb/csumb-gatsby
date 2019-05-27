import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Container from 'components/common/container'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/layouts/sections/navigation/site'
import PageTitle from 'components/layouts/sections/header/page-title'
import showdown from 'showdown'

const converter = new showdown.Converter()

const contentfulKey = '0LX_NaWSR-H_e5HypwHySlb0yT4F1SMuM7_-LbucSJw'
const contentfulSpace = '348vmopvao05'

const EmergencyNotice = ({ title, content }) => (
  <>
    <h2>{title}</h2>
    <div
      dangerouslySetInnerHTML={{
        __html: converter.makeHtml(content),
      }}
    />
  </>
)

class UPDEmergencyPage extends Component {
  state = {
    alerts: false,
  }

  componentDidMount() {
    fetch(
      `https://cdn.contentful.com/spaces/${contentfulSpace}/environments/master/entries?access_token=${contentfulKey}&content_type=notice&fields.active=1&order=-sys.updatedAt`
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
        <SiteHeader path="/upd">University Police</SiteHeader>
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
        </Container>
      </Layout>
    )
  }
}

export default UPDEmergencyPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "upd" } }) {
      edges {
        node {
          navigation
        }
      }
    }
  }
`
