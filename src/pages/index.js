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

const sortItems = ({
  allContentfulHomepageEvent,
  allContentfulHomepageStory,
}) => {
  const results = []
  const stories = [allContentfulHomepageEvent, allContentfulHomepageStory]
  console.log(stories)
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
  return results
}

const IndexPage = ({ data }) => {
  const {
    allContentfulHomepageImageNavigation,
    allContentfulHomepageHeroImage,
  } = data

  const stories = sortItems(data)
  console.log(stories)

  return (
    <PageFeedbackContext.Provider
      value={{ email: 'webfolk@csumb.edu', title: 'Homepage', url: '/' }}
    >
      <Layout noFooterMargin={true}>
        <HomepageHero item={allContentfulHomepageHeroImage.edges[0].node} />
        <HomepageImageNavigation
          navigation={allContentfulHomepageImageNavigation.edges[0].node}
        />
        <Container topPadding>
          <Flex>
            {stories.map((story, index) => (
              <Box id={`story-${index}`} width={[1, 1, 1 / 2]} px={[0, 0, 4]}>
                {console.log(story)}
                <HomepageStory {...story} />
              </Box>
            ))}
          </Flex>
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
