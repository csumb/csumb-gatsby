import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { graphql } from 'gatsby'
import { LinkyButton } from 'components/button'
import styled from 'react-emotion'
import { colors, fonts } from 'components/styles/theme'
import { Flex, Box } from '@rebass/grid/emotion'
import SiteHeader from 'components/header/site-header'
import LinkInspect from 'components/link-inspect'

const TopLevelBox = styled(Box)`
  h4 {
    margin: 0;
    button {
      font-family: ${fonts.sansSerif};
    }
  }
  margin-bottom: 1rem;
`

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

const SecondLevelTitle = styled('h2')`
  font-family: ${fonts.sansSerif};
  margin-bottom: 0;
`

const SubItem = styled('li')`
  padding: 0.5rem;
  &:hover {
    background: ${colors.primary.lightest};
  }
  h3 {
    margin: 0;
    color: ${colors.primary.dark};
    font-family: ${fonts.sansSerif};
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

const HiddenLink = styled(LinkInspect)`
  text-decoration: none;
  color: ${colors.black};
`

const ThirdLevelList = styled('ul')`
  margin: 0;
  list-style-type: none;
`

const ThirdLevelTitle = styled('h2')`
  font-family: ${fonts.sansSerif};
  margin: 0;
`

const SubItemContent = ({ item }) => (
  <>
    <h3>{item.title}</h3>
    {item.childContentfulNavigationItemDescriptionTextNode && (
      <p
        dangerouslySetInnerHTML={{
          __html:
            item.childContentfulNavigationItemDescriptionTextNode
              .childMarkdownRemark.html,
        }}
      />
    )}
  </>
)

class EverythingPageNavigation extends React.Component {
  state = {
    secondSelected: false,
    thirdSelected: false,
  }

  componentDidMount() {
    if (this.props.selectedItem) {
      this.setState({
        secondSelected: this.props.selectedItem,
      })
      window.location.hash = this.props.navigation[this.props.selectedItem].slug
    }
  }

  handleSecondLevel(id, event) {
    event.preventDefault()
    this.setState({
      secondSelected: id,
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
    const { topLevelItems, navigation } = this.props
    return (
      <Flex flexWrap="wrap">
        <Box width={[1, 1 / 5]} px={2}>
          <TopLevelList>
            {topLevelItems.map(item => (
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
            <SecondLevelTitle>
              {navigation[secondSelected].title}
            </SecondLevelTitle>
            <SecondLevelList>
              {navigation[secondSelected].contentfulchildren.map(id => (
                <SubItem key={id.contentful_id}>
                  {navigation[id.contentful_id].link ? (
                    <HiddenLink to={navigation[id.contentful_id].link}>
                      <SubItemContent item={navigation[id.contentful_id]} />
                    </HiddenLink>
                  ) : (
                    <HiddenButton
                      onClick={this.handleThirdLevel.bind(
                        this,
                        id.contentful_id
                      )}
                    >
                      <SubItemContent item={navigation[id.contentful_id]} />
                    </HiddenButton>
                  )}
                </SubItem>
              ))}
            </SecondLevelList>
          </Box>
        )}
        {thirdSelected && (
          <Box width={[1, 2 / 5]} px={2}>
            <ThirdLevelTitle>{navigation[thirdSelected].title}</ThirdLevelTitle>
            <ThirdLevelList>
              {navigation[thirdSelected].contentfulchildren.map(id => (
                <SubItem key={id.contentful_id}>
                  <HiddenLink to={navigation[id.contentful_id].link}>
                    <h3>{navigation[id.contentful_id].title}</h3>
                    {navigation[id.contentful_id]
                      .childContentfulNavigationItemDescriptionTextNode && (
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            navigation[id.contentful_id]
                              .childContentfulNavigationItemDescriptionTextNode
                              .childMarkdownRemark.html,
                        }}
                      />
                    )}
                  </HiddenLink>
                </SubItem>
              ))}
            </ThirdLevelList>
          </Box>
        )}
      </Flex>
    )
  }
}

class EverythingPage extends React.Component {
  state = {
    topLevelItem: false,
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

  componentDidMount() {
    if (!window.location.hash.length) {
      return
    }
    const slug = window.location.hash.replace('#', '')
    Object.values(this.navigation).forEach(item => {
      if (item.slug === slug) {
        this.setState({
          topLevelItem: item.contentful_id,
        })
      }
    })
  }

  render() {
    const { topLevelItem } = this.state
    return (
      <Layout pageTitle="Everything else">
        <SiteHeader path="/everything">Everything else</SiteHeader>
        <Container topPadding>
          {topLevelItem ? (
            <EverythingPageNavigation
              navigation={this.navigation}
              topLevelItems={this.topLevelItems}
              selectedItem={topLevelItem}
            />
          ) : (
            <Flex flexWrap="wrap">
              {this.topLevelItems.map((item, key) => (
                <TopLevelBox
                  key={item.contentful_id}
                  width={[1, 1, 1 / 4]}
                  px={2}
                >
                  <h4>
                    <LinkyButton
                      onClick={event => {
                        event.preventDefault()
                        this.setState({
                          topLevelItem: item.contentful_id,
                        })
                      }}
                    >
                      {item.title}
                    </LinkyButton>
                  </h4>
                  {item.childContentfulNavigationItemDescriptionTextNode && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          item.childContentfulNavigationItemDescriptionTextNode
                            .childMarkdownRemark.html,
                      }}
                    />
                  )}
                </TopLevelBox>
              ))}
            </Flex>
          )}
        </Container>
      </Layout>
    )
  }
}

export default EverythingPage

export const query = graphql`
  {
    allContentfulNavigationItem(sort: { fields: [title] }) {
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
