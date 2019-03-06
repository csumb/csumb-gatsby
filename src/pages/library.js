import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { Flex, Box } from '@rebass/grid/emotion'
import SiteNavigation from 'components/navigation/site'
import Blocks from 'templates/blocks'
import { colors } from 'style/theme'
import { InputText, InputSelect, Submit } from 'components/forms'
import oneSearchLogo from 'assets/images/library-one-search.png'

const LibrarySearchWrapper = styled('form')`
  background: ${colors.muted.highlight};
  padding: 1rem;
  margin: 1rem;
`

const AdvancedSearch = styled('a')`
  display: block;
  margin-top: 1rem;
`

class LibrarySearch extends React.Component {
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
          <Box width={[1, 6 / 12]} px={2}>
            <InputText
              name="_extra_query"
              label="Search the library"
              placeholder="Search"
              hideLabel={true}
              onChange={this.handleChangeQuery.bind(this)}
              huge
            />
          </Box>
          <Box width={[1, 4 / 12]} px={2}>
            <InputSelect
              name="search_scope"
              label="Limit search"
              hideLabel={true}
              huge
              placeholder="Filter"
              defaultValue="EVERYTHING"
              options={[
                { value: 'EVERYTHING', label: 'Everything', selected: true },
                { value: 'PRIMO_CENTRAL', label: 'Articles' },
                { value: '01CALS_UMB', label: 'Books & media at CSUMB' },
                { value: '01CALS', label: 'Books & media in the CSU system' },
                { value: '01CALS_UMB_CR', label: 'Course Reserves' },
              ]}
            />
          </Box>
          <Box width={[1, 2 / 12]} px={2}>
            <Submit value="Search" nomargin={true} huge />
            <AdvancedSearch href="https://csumb-primo.hosted.exlibrisgroup.com/primo-explore/search?sortby=rank&vid=01CALS_UMB&lang=en_US&mode=advanced">
              Advanced search
            </AdvancedSearch>
          </Box>
        </Flex>
      </LibrarySearchWrapper>
    )
  }
}

class LibraryPage extends React.Component {
  render() {
    const { data } = this.props
    return (
      <Layout pageTitle="Library">
        <SiteHeader path="/library">Library</SiteHeader>
        {data.allCsumbNavigation && (
          <SiteNavigation
            navigation={data.allCsumbNavigation.edges[0].node.navigation}
          />
        )}
        <Container>
          <LibrarySearch />
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
