import React from 'react'
import { Layout } from '../components/layouts/default'
import Container from '../components/common/container'
import { Flex, Box } from '../components/common/grid'
import { graphql } from 'gatsby'
import moment from 'moment'
import {
  NonFeaturedStory,
  FeaturedStory,
  HomepageImageNavigation,
  MoreItemsButton,
  HomepageHero,
} from '../components/homepage'

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
    allContentfulHomepageImageNavigation,
    allContentfulHomepageHeroImage,
  } = data

  const { featured, notFeatured } = sortItems(data)

  const colPadding = [0, 0, 4, 6]
  return (
    <Layout noFooterMargin={true}>
      <HomepageHero item={allContentfulHomepageHeroImage.edges[0].node} />
      <HomepageImageNavigation
        navigation={allContentfulHomepageImageNavigation.edges[0].node}
      />
      <Container topPadding>
        <h2>News &amp; events</h2>
        <Flex>
          <Box width={[1, 1, 1 / 2, 1 / 3]} order={[2, 1, 1]} pr={colPadding}>
            {notFeatured.map((item, key) => (
              <NonFeaturedStory key={`non-featured-${key}`} {...item} />
            ))}
          </Box>
          <Box
            width={[1, 1, 1 / 2, 2 / 3]}
            order={[1, 2, 2]}
            pl={colPadding}
            pr={colPadding}
          >
            {featured.map((item, key) => (
              <FeaturedStory key={`featured-${key}`} {...item} />
            ))}
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
          image {
            resize(width: 800) {
              src
            }
            fixed {
              src
              srcSet
            }
          }
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
            resize(width: 800) {
              src
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
          showAnniversaryBanner
          image {
            lowquality: resize(width: 1300, quality: 20) {
              src
            }
            highquality: resize(width: 1300, quality: 90) {
              src
            }
          }
        }
      }
    }
  }
`
