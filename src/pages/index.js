import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import { graphql } from 'gatsby'
import moment from 'moment'
import HomepageHero from 'components/homepages/samples/lazy-hero'
import {
  HomepageNavigation,
  NonFeaturedStory,
  FeaturedStory,
  Nuggets,
} from 'components/pages/homepage'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    const {
      allContentfulStory,
      allContentfulEvent,
      allContentfulNuggets,
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
      featured: sortItems([allContentfulStory, allContentfulEvent], true),
      notFeatured: sortItems([allContentfulStory, allContentfulEvent], false),
      nuggets: sortItems([allContentfulNuggets], null, true),
    }
  }

  render() {
    const { featured, notFeatured, nuggets } = this.stories
    const colPadding = [0, 0, 3, 3]
    return (
      <Layout>
        <HomepageHero />
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
    allContentfulStory(sort: { fields: goLiveDate }) {
      edges {
        node {
          title
          featured
          link
          goLiveDate
          unpbulishDate
          childContentfulStoryDescriptionTextNode {
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
    allContentfulEvent(sort: { fields: goLiveDate }) {
      edges {
        node {
          title
          featured
          link
          goLiveDate
          eventDate
          unpbulishDate
          contentful_id
          childContentfulEventDescriptionTextNode {
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
    allContentfulNuggets(sort: { fields: goLiveDate }) {
      edges {
        node {
          title
          link
          goLiveDate
          unpublishDate
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
  }
`
