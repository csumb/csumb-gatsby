import React, { Component } from 'react'
import {
  Layout,
  PageTitle,
  SiteHeader,
  SiteNavigation,
} from '../../components/layouts/default'
import Container from '../../components/common/container'
import { LeadParagraph } from '../../components/common/type'
import { graphql } from 'gatsby'
import { Flex, Box } from '../../components/common/grid'
import Link from 'gatsby-link'
import { InputText, Submit } from '../../components/common/forms'
import { bp } from '../../style'
import Well from '../../components/common/well'
import styled from '@emotion/styled'
import slugify from 'slugify'

const GraduateList = styled('ul')`
  list-style-type: none;
  margin: 0;
  ${bp({
    columnCount: [1, 2, 3],
  })}
  li {
    padding-left: 0;
  }
`

const ViewGraduate = ({ graduate }) => {
  const name = `${graduate.data.first_name} ${graduate.data.last_name}`
  const slug = slugify(name)
  return (
    <li>
      <Link to={`/scienceillustration/graduate/${slug}`}>
        {name}
        {graduate.data.class && <>({graduate.data.class})</>}
      </Link>
    </li>
  )
}

class ScienceIllustrationGallerySearch extends Component {
  state = {
    search: false,
    results: [],
  }

  handleChangeSearch(event) {
    this.setState({
      search: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const query = this.state.search.toLowerCase()
    let results = []
    this.props.graduates.map(graduate => {
      if (
        `${graduate.node.data.first_name} ${graduate.node.data.last_name}`
          .toLowerCase()
          .search(query) > -1
      ) {
        results.push(graduate)
      }
      return results
    })
    this.setState({
      results: results,
    })
  }

  render() {
    const { results } = this.state
    return (
      <Well>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Flex>
            <Box width={[1, 6 / 12]} px={2}>
              <InputText
                name="search"
                label="Search graduates"
                placeholder="Search"
                hideLabel={true}
                onChange={this.handleChangeSearch.bind(this)}
              />
            </Box>
            <Box width={[1, 3 / 12]}>
              <Submit value="Search" nomargin small />
            </Box>
          </Flex>
        </form>
        {results.length ? (
          <GraduateList>
            {results.map(graduate => (
              <ViewGraduate key={graduate.node.id} graduate={graduate.node} />
            ))}
          </GraduateList>
        ) : null}
      </Well>
    )
  }
}

class ScienceIllustrationGalleryPage extends Component {
  render() {
    const { data } = this.props
    return (
      <Layout>
        <SiteHeader path="/scienceillustration">
          Science Illustration
        </SiteHeader>
        {data.allCsumbNavigation &&
          data.allCsumbNavigation.edges &&
          data.allCsumbNavigation.edges[0] && (
            <SiteNavigation
              navigation={data.allCsumbNavigation.edges[0].node.navigation}
            />
          )}
        <Container>
          <PageTitle layout="page">Graduate gallery</PageTitle>
          <LeadParagraph>
            Explore the breadth of work that graduates of the program produce
            both during their time as students and as freelance artists. Search
            for a particular graduate or view by graduating year.
          </LeadParagraph>
          <ScienceIllustrationGallerySearch
            graduates={data.allAirtable.edges}
          />
          <GraduateList>
            {data.allAirtable.edges.map(graduate => (
              <ViewGraduate key={graduate.node.id} graduate={graduate.node} />
            ))}
          </GraduateList>
        </Container>
      </Layout>
    )
  }
}

export default ScienceIllustrationGalleryPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "scienceillustration" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allAirtable(
      filter: { queryName: { eq: "ScienceIllustrationGraduates" } }
      sort: { fields: [data___last_name, data___first_name] }
    ) {
      edges {
        node {
          id
          table
          data {
            first_name
            class
            last_name
          }
        }
      }
    }
  }
`
