import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import SiteHeader from 'components/layouts/sections/header/site-header'
import SiteNavigation from 'components/layouts/sections/navigation/site'
import 'react-vertical-timeline-component/style.min.css'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import bp from 'style/breakpoints'
import Container from 'components/common/container'
import moment from 'moment'
import { Flex, Box } from 'components/common/grid'
import quoteIcon from 'assets/images/quote.svg'

const red = '#f0151e'

const startDate = moment([1993])
const endDate = moment([2008])
const duration = endDate.diff(startDate)

const getDatePosition = date => {
  const eventDateDiff = endDate.diff(moment(date.split('-')))
  return (eventDateDiff / duration) * 100
}

const Timeline = styled('div')`
  position: relative;
  min-height: 100px;
`

const TimelineLine = styled('div')`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 4px;
    background: ${colors.black};
    ${bp({
      left: ['15px', '50%'],
      marginLeft: [0, '-2px'],
    })}
  }
`

const TimelineContent = styled('div')`
  ${bp({
    width: ['90%', '45%'],
    marginBottom: ['1.5rem', 0],
    marginLeft: ['1.5rem', 0],
  })}
`

const TimelineDate = styled('h4')`
  font-size: 1.3rem;
  ${bp({
    width: ['85%', '45%'],
    position: ['normal', 'absolute'],
    display: ['block', 'inline-block'],
    marginLeft: ['0.7rem', 0],
  })}
`

const TimelineContentWrapper = styled('section')`
  clear: both;
  position: relative;
  ${bp({
    paddingTop: ['0', '5rem'],
  })}
  &:nth-of-type(even) ${TimelineContent} {
    ${bp({
      float: ['none', 'right'],
    })}
  }
  &:nth-of-type(even) ${TimelineDate} {
    ${bp({
      textAlign: ['left', 'right'],
    })}
  }
  &:nth-of-type(odd) ${TimelineDate} {
    ${bp({
      float: ['none', 'right'],
      right: ['normal', '0px'],
    })}
  }
`

const TimelineDescription = styled('p')`
  margin: 0;
  font-size: 0.9rem;
`

const TimelineCloser = styled('div')`
  clear: both;
  height: 3rem;
`

const TimelineQuote = styled('blockquote')`
  font-size: 1.1rem;
`

const TimelineCite = styled('cite')`
  display: block;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 700;
  font-style: normal;
`

const TimelineQuoteIcon = styled('img')`
  max-width: 50px;
`

const TimelineTitle = styled('h3')``

const TimelineDot = styled('div')`
  position: absolute;
  background: ${red};
  margin-top: -10px;
  ${bp({
    left: ['0', '50%'],
    width: ['25px', '50px'],
    height: ['25px', '50px'],
    borderRadius: ['12.5px', '25px'],
    marginLeft: ['-15px', '-25px'],
  })}
`

const TimelineNavigation = styled('div')`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background: ${colors.primary.dark};
  height: 75px;
  z-index: 500;
  ${bp({
    display: ['none', 'block'],
  })}
`

const TimelineNavigationYearMarker = styled('div')`
  width: ${(1 / 24) * 100}%;
  display: inline-block;
  height: 75px;
  border-right: 1px solid ${colors.primary.darkest};
`

const TimelineNavigationItemElement = styled('a')`
  width: 6px;
  padding: 0;
  height: 100%;
  position: absolute;
  cursor: pointer;
  display: inline-block;
  &:hover {
    background: ${colors.white};
  }
  ${props =>
    props.isActive
      ? `background: ${red};`
      : `background: ${colors.primary.light};`}
`

const formatDate = data => {
  const date = moment(data.Date)
  if (data.Show_full_date) {
    return date.format('MMMM d, Y')
  }
  return date.format('Y')
}

const TimelineItem = props => {
  const {
    Title,
    Source_URL,
    Photos,
    Description,
    Quote,
    Quote_source,
    recordId,
  } = props
  return (
    <TimelineContentWrapper id={recordId}>
      <TimelineDate className="timeline-date">{formatDate(props)}</TimelineDate>
      <TimelineDot />
      <TimelineContent className="timeline-content">
        <TimelineTitle>
          {Source_URL ? <a href={Source_URL}>{Title}</a> : <>{Title}</>}
        </TimelineTitle>
        {Photos && <img src={Photos[0].url} alt="" />}
        {Quote && (
          <TimelineQuote>
            <Flex>
              <Box width={2 / 12} pr={2}>
                <TimelineQuoteIcon src={quoteIcon} alt="" />
              </Box>
              <Box width={10 / 12}>
                <div>{Quote}</div>
                {Quote_source && (
                  <TimelineCite>
                    {'— '}
                    {Quote_source}
                  </TimelineCite>
                )}
              </Box>
            </Flex>
          </TimelineQuote>
        )}
        {Description && (
          <TimelineDescription>{Description}</TimelineDescription>
        )}
      </TimelineContent>
    </TimelineContentWrapper>
  )
}

const TimelineNavigationMarkers = () => {
  const items = Array.from(Array(24), (x, index) => index + 1)
  return (
    <>
      {items.map(item => (
        <TimelineNavigationYearMarker key={item} />
      ))}
    </>
  )
}

class TimelinePage extends Component {
  state = {
    currentItem: false,
  }

  render() {
    const { data } = this.props
    const { currentItem } = this.state
    return (
      <Layout pageTitle="25th Anniversary timeline" noFooterMargin={true}>
        <SiteHeader path="/25">25th Anniversary</SiteHeader>
        {data.allCsumbNavigation &&
          data.allCsumbNavigation.edges &&
          data.allCsumbNavigation.edges[0] && (
            <SiteNavigation
              navigation={data.allCsumbNavigation.edges[0].node.navigation}
            />
          )}
        {data.allAirtable && (
          <>
            <TimelineNavigation>
              {data.allAirtable.edges.map(({ node }) => (
                <TimelineNavigationItemElement
                  style={{ left: `${getDatePosition(node.data.Date)}%` }}
                  href={`#${node.recordId}`}
                  key={node.recordId}
                  isActive={node.recordId === currentItem}
                  onClick={event => {
                    this.setState({
                      currentItem: node.recordId,
                    })
                  }}
                />
              ))}
              <TimelineNavigationMarkers />
            </TimelineNavigation>
            <Timeline>
              <Container>
                <TimelineLine />
                {data.allAirtable.edges.map(({ node }) => (
                  <TimelineItem
                    {...node.data}
                    recordId={node.recordId}
                    key={node.recordId}
                  />
                ))}
              </Container>
              <TimelineCloser />
            </Timeline>
          </>
        )}
      </Layout>
    )
  }
}

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
