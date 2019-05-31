import React, { Component } from 'react'
import PlainLayout from 'components/layouts/plain'
import PageTitle from 'components/layouts/sections/header/page-title'
import { LeadParagraph } from 'components/common/type'
import Brand from 'components/layouts/sections/header/brand'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import { EverythingContent } from 'components/pages/everything'
import { graphql } from 'gatsby'

const PageNotFoundContainer = styled('div')`
  max-width: 60ch;
  margin: 3rem auto;
`

class ErrorPage extends Component {
  componentDidMount() {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'pageNotFound', '404', window.location.href)
      if (typeof window.Rollbar !== 'undefined') {
        const referrer =
          typeof document !== 'undefined' && document.referrer
            ? document.referrer
            : 'none'
        window.Rollbar.error(
          `csumb-404: ${window.location.href} referrer: ${referrer}`
        )
      }
    }
  }
  render() {
    const items = this.props.data.allContentfulNavigationItem.edges
    return (
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
