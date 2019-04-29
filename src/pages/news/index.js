import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Container from 'components/common/container'
import { graphql } from 'gatsby'
//import { NewsList, NewsListItem } from 'components/pages/news/list'
import SiteNavigation from 'components/layouts/sections/navigation/site'
import Blocks from 'templates/blocks'

const NewsPage = ({ data }) => {
  return (
    <Layout pageTitle="News" siteTitle="News" isSiteHomepage={true}>
      <SiteHeader path="/news">News</SiteHeader>
      {data.allCsumbNavigation && (
        <SiteNavigation
          navigation={data.allCsumbNavigation.edges[0].node.navigation}
        />
      )}
      <Container topPadding>
        {/*<h2>Latest news</h2>
        <NewsList>
          {data.allContentfulNewsStory.edges.map(story => (
            <NewsListItem
              showTags={true}
              {...story.node}
              key={story.node.contentful_id}
            />
          ))}
          </NewsList>*/}
        {data.allCsumbPage && (
          <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
        )}
      </Container>
    </Layout>
  )
}

export default NewsPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "news" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allCsumbPage(filter: { layout: { eq: "site" }, site: { eq: "news" } }) {
      edges {
        node {
          pageContent
          layout
        }
      }
    }
    allContentfulNewsStory(sort: { order: DESC, fields: [goLiveDate] }) {
      edges {
        node {
          contentful_id
          slug
          title
          goLiveDate
          bylineName
          bylineDate
          teaserHeadline
          teaserImage {
            file {
              url
              fileName
              contentType
            }
          }
          childContentfulNewsStoryTeaserDescriptionTextNode {
            teaserDescription
          }
          tags {
            id
            name
            slug
          }
        }
      }
    }
  }
`
