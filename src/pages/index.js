import React from 'react'
import { Layout } from '../components/layouts/default'
import Container from '../components/common/container'
import { Flex, Box } from '../components/common/grid'
import { graphql } from 'gatsby'
import moment from 'moment'
import {
  HomepageStory,
  HomepageImageNavigation,
  MoreItemsButton,
  HomepageHero,
} from '../components/homepage'

const sortItems = ({
  allContentfulHomepageEvent,
  allContentfulHomepageStory,
}) => {
  const results = []
  const stories = [allContentfulHomepageEvent, allContentfulHomepageStory]

  stories.forEach(type => {
    type.edges.forEach(item => {
      if (
        moment(item.node.unpublishDate).unix() > moment().unix() &&
        moment(item.node.goLiveDate).unix() <= moment().unix()
      ) {
        results.push(item.node)
      }
      return item
    })
    return type
  })
  return results.reduce(function(result, value, index, array) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2))
    return result
  }, [])
}

const IndexPage = ({ data }) => {
  const {
    allContentfulHomepageImageNavigation,
    allContentfulHomepageHeroImage,
  } = data

  const stories = sortItems(data)

  return (
    <Layout noFooterMargin={true}>
      <HomepageHero item={allContentfulHomepageHeroImage.edges[0].node} />
      <HomepageImageNavigation
        navigation={allContentfulHomepageImageNavigation.edges[0].node}
      />
      <Container topPadding>
        {stories.map(storyPair => (
          <Flex>
            {storyPair.map(story => (
              <Box width={[1, 1, 1 / 2]} px={[0, 0, 4]}>
                <HomepageStory {...story} />
              </Box>
            ))}
          </Flex>
        ))}
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
          link
          goLiveDate
          unpublishDate
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
          link
          goLiveDate
          eventDate
          unpublishDate
          contentful_id
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
          mobileImage {
            lowquality: resize(width: 600, quality: 20) {
              src
            }
            highquality: resize(width: 600, quality: 90) {
              src
            }
          }
        }
      }
    }
  }
`
