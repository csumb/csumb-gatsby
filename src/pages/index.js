import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import { graphql } from 'gatsby'
import {
  NonFeaturedStory,
  FeaturedStory,
  InTheNews,
  HomepageImageNavigation,
  MoreItemsButton,
} from 'components/pages/homepage'
import HomepageHero from 'components/homepages/2019/service-learning'

const sortItems = ({
  allContentfulHomepageEvent,
  allContentfulHomepageStory,
}) => {
  let result = {
    featured: [],
    notFeatured: [],
  }

  const stories = [allContentfulHomepageEvent, allContentfulHomepageStory]

  stories.forEach(type => {
    type.edges.forEach(item => {
      const key = item.node.featured ? 'featured' : 'notFeatured'
      result[key].push(item.node)
      return item
    })
    return type
  })
  return result
}

const IndexPage = ({ data }) => {
  const {
    allContentfulHomepageInTheNews,
    allContentfulHomepageImageNavigation,
  } = data

  const { featured, notFeatured } = sortItems(data)

  const colPadding = [0, 0, 3, 3]
  return (
    <Layout noFooterMargin={true}>
      <HomepageHero />
      <HomepageImageNavigation
        navigation={allContentfulHomepageImageNavigation.edges[0].node}
      />
      <Container topPadding>
        <h2>News &amp; events</h2>
        <Flex flexWrap="wrap">
          <Box width={[1, 1, 1 / 2, 3 / 12]} order={[2, 1, 1]} pr={colPadding}>
            {notFeatured.map(item => (
              <NonFeaturedStory key={item.contentful_id} {...item} />
            ))}
          </Box>
          <Box
            width={[1, 1, 1 / 2, 6 / 12]}
            order={[1, 2, 2]}
            pl={colPadding}
            pr={colPadding}
          >
            {featured.map(item => (
              <FeaturedStory key={item.contentful_id} {...item} />
            ))}
          </Box>
          <Box width={[1, 1, 1, 3 / 12]} order={3} pl={colPadding}>
            <InTheNews articles={allContentfulHomepageInTheNews.edges} />
          </Box>
        </Flex>
      </Container>
      <Container topPadding>
        <MoreItemsButton style={{ marginRight: '1rem' }} to="/events">
          View more events
        </MoreItemsButton>
        <MoreItemsButton to="/news">Read more news</MoreItemsButton>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allContentfulHomepageImageNavigation(limit: 1) {
      edges {
        node {
          childContentfulHomepageImageNavigationDisplayNamesTextNode {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          childContentfulHomepageImageNavigationLinksTextNode {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          childContentfulHomepageImageNavigationAlternativeTextTextNode {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          images {
            file {
              url
              fileName
              contentType
            }
          }
        }
      }
    }

    allContentfulHomepageStory(
      limit: 20
      sort: { fields: goLiveDate, order: DESC }
    ) {
      edges {
        node {
          title
          featured
          link
          goLiveDate
          unpublishDate
          childContentfulHomepageStoryDescriptionTextNode {
            description
          }
          news_story {
            id
            slug
            goLiveDate
          }
          image {
            fixed {
              src
              srcSet
            }
            fluid {
              src
              srcSet
            }
          }
        }
      }
    }

    allContentfulHomepageInTheNews(
      limit: 10
      sort: { fields: [goLiveDate], order: [DESC, ASC] }
    ) {
      edges {
        node {
          childContentfulHomepageInTheNewsHeadlineTextNode {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          link
          source
          goLiveDate
          contentful_id
        }
      }
    }
    allContentfulHomepageEvent(
      limit: 10
      sort: { fields: goLiveDate, order: DESC }
    ) {
      edges {
        node {
          title
          featured
          link
          goLiveDate
          eventDate
          unpublishDate
          contentful_id
          childContentfulHomepageEventDescriptionTextNode {
            description
          }
          image {
            fixed {
              src
              srcSet
            }
            fluid {
              src
              srcSet
            }
          }
        }
      }
    }
    allContentfulHomepageHeroImage(sort: { fields: goLiveDate }) {
      edges {
        node {
          title
          description
          goLiveDate
          darkImage
          link
          lighten
          fixedHeight
          imageHeight
          image {
            file {
              url
              fileName
              contentType
            }
          }
        }
      }
    }
  }
`
