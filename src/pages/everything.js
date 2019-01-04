import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { graphql } from 'gatsby'
import styled from 'react-emotion'
import { colors } from 'components/styles/theme'
import { Flex, Box } from '@rebass/grid/emotion'
import SiteHeader from 'components/site-header'
import LazyHero from 'react-lazy-hero'
import heroImage from 'assets/hero-images/people/students-sunset-beach.jpg'

const TopLevelList = styled('ul')`
  border-right: 1px solid ${colors.muted.dark};
  margin: 0;
  list-style-type: none;
`
const TopLevelItem = styled('li')`
  margin: 0;
  padding: 0;
`

const TopLevelItemButton = styled('button')`
  color: ${colors.primary.dark};
  border: 0;
  background: transparent;
  cursor: pointer;
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem;
  ${props =>
    props.isActive &&
    `background: ${colors.primary.dark};
    color: ${colors.white};`};
`

const SecondLevelList = styled('ul')`
  list-style-type: none;
  margin: 0;
`

const SecondLevelItem = styled('li')`
  padding: 0.5rem;
  h3 {
    margin: 0;
    color: ${colors.primary.dark};
  }
  p {
    margin: 0;
  }
`

const HiddenButton = styled('button')`
  cursor: pointer;
  padding: 0;
  border: 0;
  background: transparent;
  display: block;
  width: 100%;
  text-align: left;
`

const ThirdLevelList = styled('ul')`
  margin: 0;
  list-style-type: none;
`

const EverythingHero = () => (
  <LazyHero
    opacity={0}
    parallaxOffset={0}
    transitionDuration={0}
    imageSrc={heroImage}
    minHeight="250px"
  />
)

class EverythingPage extends React.Component {
  state = {
    firstSelected: false,
    secondSelected: false,
    thirdSelected: false,
  }

  constructor(props) {
    super(props)

    this.navigation = {}
    this.topLevelItems = []
    props.data.allContentfulNavigationItem.edges.forEach(node => {
      node = node.node
      this.navigation[node.contentful_id] = node
      if (node.topLevelItem) {
        this.topLevelItems.push(node)
      }
    })
  }

  handleSecondLevel(id, event) {
    event.preventDefault()
    this.setState({
      secondSelected: id,
      firstSelected: id,
      thirdSelected: false,
    })
  }

  handleThirdLevel(id, event) {
    event.preventDefault()
    this.setState({
      thirdSelected: id,
    })
  }

  render() {
    const { secondSelected, thirdSelected } = this.state
    return (
      <Layout pageTitle="Everything else">
        <SiteHeader path="/everything">Everything else</SiteHeader>
        <EverythingHero />
        <Container topPadding>
          <Flex flexWrap="wrap">
            <Box width={[1, 1 / 5]} px={2}>
              <TopLevelList>
                {this.topLevelItems.map(item => (
                  <TopLevelItem key={item.contentful_id}>
                    <TopLevelItemButton
                      onClick={this.handleSecondLevel.bind(
                        this,
                        item.contentful_id
                      )}
                      isActive={secondSelected === item.contentful_id}
                    >
                      {item.title}
                    </TopLevelItemButton>
                  </TopLevelItem>
                ))}
              </TopLevelList>
            </Box>
            {secondSelected && (
              <Box width={[1, 2 / 5]} px={2}>
                <h2>{this.navigation[secondSelected].title}</h2>
                <SecondLevelList>
                  {this.navigation[secondSelected].contentfulchildren.map(
                    id => (
                      <SecondLevelItem key={id.contentful_id}>
                        <HiddenButton
                          onClick={this.handleThirdLevel.bind(
                            this,
                            id.contentful_id
                          )}
                        >
                          <h3>{this.navigation[id.contentful_id].title}</h3>
                          {this.navigation[id.contentful_id]
                            .childContentfulNavigationItemDescriptionTextNode && (
                            <p
                              dangerouslySetInnerHTML={{
                                __html: this.navigation[id.contentful_id]
                                  .childContentfulNavigationItemDescriptionTextNode
                                  .childMarkdownRemark.html,
                              }}
                            />
                          )}
                        </HiddenButton>
                      </SecondLevelItem>
                    )
                  )}
                </SecondLevelList>
              </Box>
            )}
            {thirdSelected && (
              <Box width={[1, 2 / 5]} px={2}>
                <h2>{this.navigation[thirdSelected].title}</h2>
                <ThirdLevelList />
              </Box>
            )}
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default EverythingPage

export const query = graphql`
  {
    allContentfulNavigationItem {
      edges {
        node {
          contentful_id
          title
          link
          slug
          topLevelItem
          childContentfulNavigationItemDescriptionTextNode {
            childMarkdownRemark {
              html
            }
          }
          contentfulchildren {
            contentful_id
          }
        }
      }
    }
  }
`
