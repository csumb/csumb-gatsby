import React from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import SiteHeader from 'components/layouts/sections/header/site-header'
import SiteNavigation from 'components/layouts/sections/navigation/site'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import moment from 'moment'

const formatDate = data => {
  const date = moment(data.Date)
  if (data.Show_full_date) {
    return date.format('MMMM d, Y')
  }
  return date.format('Y')
}

const TimelineTitle = styled('h4')`
  margin: 0;
`

const TimelineBackground = styled('div')`
  .vertical-timeline {
    margin-top: 0;
    margin-bottom: 0;
  }
  img {
    margin-top: 1rem;
    margin-bottom: 0;
  }
  .vertical-timeline-element-content {
    box-shadow: none;
    border: 1px solid #aaa;
    border-radius: 0;
  }
  .vertical-timeline-element-content::before {
    display: none;
  }
  .vertical-timeline::before {
    background: ${colors.black};
  }
  .vertical-timeline-element-icon {
    display: none;
  }
  .vertical-timeline-element-date {
    color: ${colors.black};
    font-weight: bold;
    font-size: 1.3rem !important;
  }
  @media only screen and (min-width: 1170px) {
    .vertical-timeline--two-columns .vertical-timeline-element-content {
      width: 45%;
    }
  }
`

const TimelinePage = ({ data }) => (
  <Layout pageTitle="25th Anniversary timeline">
    <SiteHeader path="/25">25th Anniversary</SiteHeader>
    {data.allCsumbNavigation &&
      data.allCsumbNavigation.edges &&
      data.allCsumbNavigation.edges[0] && (
        <SiteNavigation
          navigation={data.allCsumbNavigation.edges[0].node.navigation}
        />
      )}
    <TimelineBackground>
      <VerticalTimeline animate={false}>
        {data.allAirtable && (
          <>
            {data.allAirtable.edges.map(({ node }) => (
              <VerticalTimelineElement date={formatDate(node.data)}>
                <TimelineTitle>{node.data.Title}</TimelineTitle>
                {node.data.Photos && (
                  <img src={node.data.Photos[0].url} alt="" />
                )}
                <p>{node.data.Description}</p>
              </VerticalTimelineElement>
            ))}
          </>
        )}
      </VerticalTimeline>
    </TimelineBackground>
  </Layout>
)

export default TimelinePage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "25" } }) {
      edges {
        node {
          site
          navigation
        }
      }
    }
    allAirtable(
      filter: { queryName: { eq: "25Timeline" } }
      sort: { fields: [data___Date] }
    ) {
      edges {
        node {
          recordId
          data {
            Title
            Date
            Show_full_date
            Source_URL
            Description
            Quote
            Quote_source
            Photos {
              url
            }
          }
        }
      }
    }
  }
`
