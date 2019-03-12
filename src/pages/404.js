import React from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import PageTitle from 'components/header/page-title'
import Container from 'components/container'
import { TopLevelBox, EverythingContent } from 'components/pages/everything'
import { LeadParagraph } from 'components/type'
import { Flex, Box } from '@rebass/grid/emotion'
import EventsSidebar from 'components/events-sidebar'
import SiteHeader from 'components/header/site-header'
import Link from 'gatsby-link'
import moment from 'moment'
import { AlertFyi } from 'components/alert'

const ErrorEventPage = () => {
  const dateParts = window.location.pathname.replace('/events/', '').split('/')
  const dateFormat = moment()
    .set({
      year: dateParts[0],
      month: parseInt(dateParts[1]) - 1,
      date: dateParts[2],
    })
    .format('MMMM D, YYYY')
  return (
    <>
      <SiteHeader path="/events">Events</SiteHeader>
      <Container topPadding>
        <PageTitle>Events for {dateFormat}</PageTitle>
        <Flex flexWrap="wrap">
          <Box width={[1, 3 / 4, 3 / 4]} pr={[0, 4, 4]}>
            <AlertFyi>Sorry, there are no events on {dateFormat}.</AlertFyi>
          </Box>
          <Box width={[1, 1 / 4, 1 / 4]}>
            <EventsSidebar />
          </Box>
        </Flex>
      </Container>
    </>
  )
}

const ErrorPage = props => {
  const items = props.data.allContentfulNavigationItem.edges
  const isEvent =
    typeof window !== 'undefined' &&
    window.location.href.search('/events/') > -1

  return (
    <Layout pageTitle="Page not found">
      {isEvent ? (
        <ErrorEventPage />
      ) : (
        <Container>
          <PageTitle>Page not found</PageTitle>

          <LeadParagraph>
            We couldn't find that page, but here's a great way to find what
            you're looking for:
          </LeadParagraph>
          <Flex flexWrap="wrap">
            {items.map(edge => (
              <>
                {edge.node.topLevelItem && (
                  <TopLevelBox
                    key={edge.node.contentful_id}
                    width={[1, 1, 1 / 3]}
                    px={2}
                  >
                    <h3>
                      <Link to={`/everything/${edge.node.slug}`}>
                        {edge.node.title}
                      </Link>
                    </h3>
                    <EverythingContent item={edge.node} />
                  </TopLevelBox>
                )}
              </>
            ))}
          </Flex>
        </Container>
      )}
    </Layout>
  )
}

export default ErrorPage

export const query = graphql`
  {
    allContentfulNavigationItem(sort: { fields: [title] }) {
      edges {
        node {
          contentful_id
          title
          link
          slug
          topLevelItem
          childContentfulNavigationItemDescriptionTextNode {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          contentfulchildren {
            contentful_id
          }
        }
      }
    }
  }
`
