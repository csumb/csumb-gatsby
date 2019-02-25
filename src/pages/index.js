import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import { graphql } from 'gatsby'
import moment from 'moment'
import {
  NonFeaturedStory,
  FeaturedStory,
  Nuggets,
} from 'components/pages/homepage'
import HomepageHero from 'components/homepages/samples/map'

const sortItems = (items, featured, ignore) => {
  let result = []
  items.forEach(type => {
    type.edges.forEach(item => {
      if (ignore || item.node.featured === featured) {
        result.push(item.node)
      }
    })
  })
  result.sort((a, b) => {
    return moment(a.goLiveDate).unix() > moment(b.goLiveDate).unix()
  })
  return result
}

const IndexPage = ({ data }) => {
  const {
    allContentfulHomepageStory,
    allContentfulHomepageEvent,
    allContentfulHomepageInTheNews,
  } = data

  /*const featured = sortItems(
    [allContentfulHomepageStory, allContentfulHomepageEvent],
    true
  )*/
  const notFeatured = sortItems(
    [allContentfulHomepageStory, allContentfulHomepageEvent],
    false
  )
  const nuggets = sortItems([allContentfulHomepageInTheNews], null, true)
  const colPadding = [0, 0, 3, 3]
  return (
    <Layout>
      <HomepageHero />

      <Container topPadding>
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
            {allContentfulHomepageStory.edges.map(item => (
              <>
                {item.node.featured && (
                  <FeaturedStory key={item.node.contentful_id} {...item.node} />
                )}
              </>
            ))}
          </Box>
          <Box width={[1, 1, 1, 3 / 12]} order={3} pl={colPadding}>
            <Nuggets nuggets={nuggets} />
          </Box>
        </Flex>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
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
      sort: { fields: [goLiveDate, title], order: [DESC, ASC] }
    ) {
      edges {
        node {
          title
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
