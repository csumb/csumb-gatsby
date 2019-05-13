import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Container from 'components/common/container'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { Flex, Box } from 'components/common/grid'
import SiteNavigation from 'components/layouts/sections/navigation/site'
import Blocks from 'templates/blocks'
import { colors } from 'style/theme'
import { InputText, InputSelect, Submit } from 'components/common/forms'
import oneSearchLogo from 'assets/images/library-one-search.png'
import bp from 'style/breakpoints'

const LibrarySearchWrapper = styled('form')`
  background: ${colors.muted.highlight};
  padding: 1rem;
  margin: 1rem;
`

const AdvancedSearchLink = styled('a')`
  ${bp({
    float: ['none', 'right'],
  })}
`

class LibrarySearch extends Component {
  state = {
    query: false,
  }

  handleChangeQuery(event) {
    this.setState({
      query: `any,contains,${event.target.value}`,
    })
  }

  render() {
    return (
      <LibrarySearchWrapper
        action="https://csumb-primo.hosted.exlibrisgroup.com/primo-explore/search"
        method="GET"
      >
        <input type="hidden" name="vid" value="01CALS_UMB" />
        <input type="hidden" name="lang" value="en_US" />
        <input type="hidden" name="offset" value="0" />
        <input type="hidden" name="query" value={this.state.query} />
        <img src={oneSearchLogo} alt="One Search - Search the library" />
        <Flex flexWrap="wrap">
          <Box width={[1, 5 / 12]} pr={4}>
            <InputText
              name="_extra_query"
              label="Search the library"
              placeholder="Search"
              hideLabel={true}
              onChange={this.handleChangeQuery.bind(this)}
            />
          </Box>
          <Box width={[1, 4 / 12]} pr={4}>
            <InputSelect
              name="search_scope"
              label="Limit search"
              hideLabel={true}
              defaultValue="EVERYTHING"
              placeholder="Everything"
              options={[
                { value: 'EVERYTHING', label: 'Everything', selected: true },
                { value: 'PRIMO_CENTRAL', label: 'Articles' },
                { value: '01CALS_UMB', label: 'Books & media (CSUMB)' },
                { value: '01CALS', label: 'Books & media (All CSU)' },
                { value: '01CALS_UMB_CR', label: 'Course Reserves' },
              ]}
            />
          </Box>
          <Box width={[1, 1 / 12]} pr={4}>
            <Submit value="Search" nomargin={true} small />
          </Box>
          <Box width={[1, 2 / 12]}>
            <AdvancedSearchLink href="https://csumb-primo.hosted.exlibrisgroup.com/primo-explore/search?sortby=rank&vid=01CALS_UMB&lang=en_US&mode=advanced">
              Advanced search
            </AdvancedSearchLink>
          </Box>
        </Flex>
      </LibrarySearchWrapper>
    )
  }
}

class LibraryPage extends Component {
  chatRef = React.createRef()

  componentDidMount() {
    if (typeof window === 'undefined') {
      return
    }
    const script = window.document.createElement('script')
    script.src = '//us.libraryh3lp.com/js/libraryh3lp.js?8169'
    this.chatRef.current.parentNode.insertBefore(script, this.chatRef.current)
  }

  render() {
    const { data } = this.props
    return (
      <Layout pageTitle="Library" siteTitle="Library" isSiteHomepage={true}>
        <SiteHeader path="/library">Library</SiteHeader>
        {data.allCsumbNavigation &&
          data.allCsumbNavigation.edges &&
          data.allCsumbNavigation.edges[0] && (
            <SiteNavigation
              navigation={data.allCsumbNavigation.edges[0].node.navigation}
            />
          )}
        <Container>
          <LibrarySearch />
          <div ref={this.chatRef} />
          <style>{`.libraryh3lp img { height: 44px !important;}`}</style>

          {data.allCsumbPage && (
            <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
          )}
        </Container>
      </Layout>
    )
  }
}

export default LibraryPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "library" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allCsumbPage(filter: { layout: { eq: "site" }, site: { eq: "library" } }) {
      edges {
        node {
          pageContent
          layout
        }
      }
    }
  }
`
