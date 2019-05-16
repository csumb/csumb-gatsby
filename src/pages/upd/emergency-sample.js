import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Container from 'components/common/container'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/layouts/sections/navigation/site'
import PageTitle from 'components/layouts/sections/header/page-title'
import showdown from 'showdown'
import moment from 'moment'
import styled from '@emotion/styled'

const AlertDate = styled('span')`
  display: inline-block;
  font-weight: normal;
  margin-left: 1rem;
`

const converter = new showdown.Converter()

const contentfulKey = '0LX_NaWSR-H_e5HypwHySlb0yT4F1SMuM7_-LbucSJw'
const contentfulSpace = '348vmopvao05'

const EmergencyNotice = ({ title, content, date }) => (
  <>
    <h2>
      {title}{' '}
      <AlertDate>{moment(date).format('MMMM D YYYY, h:mm a')}</AlertDate>
    </h2>
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
      `https://cdn.contentful.com/spaces/${contentfulSpace}/environments/master/entries?access_token=${contentfulKey}&content_type=notice&fields.active=1`
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
                  date={alert.sys.updatedAt}
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
