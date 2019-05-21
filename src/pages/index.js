import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/common/container'
import { Flex, Box } from 'components/common/grid'
import { graphql } from 'gatsby'
import moment from 'moment'
import {
  NonFeaturedStory,
  FeaturedStory,
  InTheNews,
  HomepageImageNavigation,
  MoreItemsButton,
  HomepageHero,
} from 'components/pages/homepage'

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
    let count = 0
    type.edges.forEach(item => {
      const key = item.node.featured ? 'featured' : 'notFeatured'
      if (
        moment(item.node.unpublishDate).unix() > moment().unix() &&
        moment(item.node.goLiveDate).unix() <= moment().unix()
      ) {
        if (count < 10) {
          result[key].push(item.node)
        }
        count++
      }
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
    allContentfulHomepageHeroImage,
  } = data

  const { featured, notFeatured } = sortItems(data)

  const colPadding = [0, 0, 3, 3]
  return (
    <Layout noFooterMargin={true}>
      <HomepageHero item={allContentfulHomepageHeroImage.edges[0].node} />
      <HomepageImageNavigation
        navigation={allContentfulHomepageImageNavigation.edges[0].node}
      />
      <Container topPadding>
        <h2>News &amp; events</h2>
        <Flex flexWrap="wrap">
          <Box width={[1, 1, 1 / 2, 3 / 12]} order={[2, 1, 1]} pr={colPadding}>
            {notFeatured.map((item, key) => (
              <NonFeaturedStory key={`non-featured-${key}`} {...item} />
            ))}
          </Box>
          <Box
            width={[1, 1, 1 / 2, 6 / 12]}
            order={[1, 2, 2]}
            pl={colPadding}
            pr={colPadding}
          >
            {featured.map((item, key) => (
              <FeaturedStory key={`featured-${key}`} {...item} />
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
      limit: 50
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
            file {
              url
            }
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
      limit: 50
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
    allContentfulHomepageHeroImage(
      sort: { fields: goLiveDate, order: DESC }
      limit: 1
    ) {
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
