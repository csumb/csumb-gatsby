import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import { graphql } from 'gatsby'
import moment from 'moment'
import {
  HomepageNavigation,
  NonFeaturedStory,
  FeaturedStory,
  Nuggets,
  HomepageHero,
} from 'components/pages/homepage'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    const {
      allContentfulHomepageStory,
      allContentfulHomepageEvent,
      allContentfulHomepageNugget,
      allContentfulHomepageHeroImage,
    } = props.data

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

    this.stories = {
      featured: sortItems(
        [allContentfulHomepageStory, allContentfulHomepageEvent],
        true
      ),
      notFeatured: sortItems(
        [allContentfulHomepageStory, allContentfulHomepageEvent],
        false
      ),
      nuggets: sortItems([allContentfulHomepageNugget], null, true),
      heroImages: sortItems([allContentfulHomepageHeroImage], null, true),
    }
  }

  render() {
    const { featured, notFeatured, nuggets, heroImages } = this.stories
    const colPadding = [0, 0, 3, 3]
    return (
      <Layout>
        <HomepageHero item={heroImages[0]} />
        <Container topPadding>
          <HomepageNavigation
            items={this.props.data.allContentfulHomepageNavigation.edges}
          />
        </Container>
        <Container topPadding>
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 2, 3 / 12]} pr={colPadding}>
              {notFeatured.map(item => (
                <NonFeaturedStory key={item.contentful_id} {...item} />
              ))}
            </Box>
            <Box width={[1, 1, 1 / 2, 6 / 12]} pl={colPadding} pr={colPadding}>
              {featured.map(item => (
                <FeaturedStory key={item.contentful_id} {...item} />
              ))}
            </Box>
            <Box width={[1, 1, 1, 3 / 12]} pl={colPadding}>
              <Nuggets nuggets={nuggets} />
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
  {
    allContentfulHomepageStory(sort: { fields: goLiveDate }) {
      edges {
        node {
          title
          tags {
            name
            slug
          }
          featured
          link
          goLiveDate
          unpublishDate
          childContentfulHomepageStoryDescriptionTextNode {
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
    allContentfulHomepageEvent(sort: { fields: goLiveDate }) {
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
    allContentfulHomepageNugget(sort: { fields: goLiveDate }) {
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
    allContentfulHomepageNavigation {
      edges {
        node {
          items {
            contentful_id
            title
            link
            childContentfulHomepageNavigationItemDescriptionTextNode {
              description
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
