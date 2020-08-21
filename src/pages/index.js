import React from 'react'
import { Layout } from '../components/layouts/default'
import Container from '../components/common/container'
import { Flex, Box } from '../components/common/grid'
import { graphql } from 'gatsby'
import moment from 'moment'
import {
  HomepageStory,
  HomepageImageNavigation,
  HomepageHero,
} from '../components/homepage'
import PageFeedbackContext from '../components/contexts/page-feedback'
import { AlertTop } from '../components/common/alert'

const sortItems = ({
  allContentfulHomepageEvent,
  allContentfulHomepageStory,
}) => {
  const results = []
  const stories = [allContentfulHomepageEvent, allContentfulHomepageStory]

  stories.forEach(type => {
    type.edges.forEach(item => {
      if (
        moment(item.node.unpublishDate)
          .unix()
          .valueOf() > moment().unix() &&
        moment(item.node.goLiveDate)
          .unix()
          .valueOf() <= moment().unix()
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
    <PageFeedbackContext.Provider
      value={{ email: 'webfolk@csumb.edu', title: 'Homepage', url: '/' }}
    >
      <Layout noFooterMargin={true}>
        <AlertTop>
          <h4 style={{ color: 'white', marginBottom: '10px' }}>
            Air quality and area{' '}
            <a href="/news/river-carmel-and-dolan-fire-information">
              wildfire update.
            </a>
          </h4>
          <h6 style={{ marginBottom: '5px', color: 'white', fontWeight: 100 }}>
            Visit the <a href="/health/coronavirus-information">COVID-19</a>{' '}
            webpage for pandemic health and safety information.
          </h6>
        </AlertTop>
        <HomepageHero item={allContentfulHomepageHeroImage.edges[0].node} />
        <HomepageImageNavigation
          navigation={allContentfulHomepageImageNavigation.edges[0].node}
        />
        <Container topPadding>
          {stories.map((storyPair, index) => (
            <Flex id={`storypair-${index}`}>
              {storyPair.map((story, index) => (
                <Box id={`story-${index}`} width={[1, 1, 1 / 2]} px={[0, 0, 4]}>
                  <HomepageStory {...story} />
                </Box>
              ))}
            </Flex>
          ))}
        </Container>
      </Layout>
    </PageFeedbackContext.Provider>
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
          textPosition
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
            lowquality: resize(width: 600, height: 600, quality: 20) {
              src
            }
            highquality: resize(width: 600, height: 600, quality: 90) {
              src
            }
          }
        }
      }
    }
  }
`
