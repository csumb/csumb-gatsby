import React from 'react'
import PlainLayout from 'components/layouts/plain'
import Layout from 'components/layouts/default'
import PageTitle from 'components/layouts/sections/header/page-title'
import Container from 'components/common/container'
import { LeadParagraph } from 'components/common/type'
import { Flex, Box } from '@rebass/grid/emotion'
import EventsSidebar from 'components/events/sidebar'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Brand from 'components/layouts/sections/header/brand'
import moment from 'moment'
import { AlertFyi } from 'components/common/alert'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import { EverythingContent } from 'components/pages/everything'
import { graphql } from 'gatsby'

const PageNotFoundContainer = styled('div')`
  max-width: 60ch;
  margin: 3rem auto;
`

const ErrorEventPage = ({ categories }) => {
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
            <EventsSidebar categories={categories} />
          </Box>
        </Flex>
      </Container>
    </>
  )
}

class ErrorPage extends React.Component {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.gtag('event', 'pageNotFound', '404', window.location.href)
    }
  }
  render() {
    const items = this.props.data.allContentfulNavigationItem.edges
    const isEvent =
      typeof window !== 'undefined' &&
      window.location.href.search('/events/') > -1

    return (
      <>
        {isEvent ? (
          <Layout>
            <ErrorEventPage
              categories={this.props.data.site.siteMetadata.eventCategories}
            />
          </Layout>
        ) : (
          <PlainLayout>
            <PageNotFoundContainer>
              <Brand style={{ maxWidth: '350px' }} />
              <PageTitle>Page not found</PageTitle>

              <LeadParagraph>
                We couldn't find that page, but here's a great way to find what
                you're looking for:
              </LeadParagraph>
              {items.map(edge => (
                <>
                  {edge.node.topLevelItem && (
                    <>
                      <h3>
                        <Link to={`/everything/${edge.node.slug}`}>
                          {edge.node.title}
                        </Link>
                      </h3>
                      <EverythingContent item={edge.node} />
                    </>
                  )}
                </>
              ))}
            </PageNotFoundContainer>
          </PlainLayout>
        )}
      </>
    )
  }
}

export default ErrorPage

export const query = graphql`
  {
    site {
      siteMetadata {
        eventCategories {
          name
          slug
        }
      }
    }
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
