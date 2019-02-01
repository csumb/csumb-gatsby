import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import PageTitle from 'components/header/page-title'
import SiteNavigation from 'components/navigation/site'
import { LeadParagraph } from 'components/type'
import { graphql } from 'gatsby'
import { Flex, Box } from '@rebass/grid'
import Link from 'gatsby-link'
import { InputText, Submit } from 'components/forms'
import Well from 'components/well'

const ViewGraduate = ({ graduate }) => (
  <li>
    <Link to={`/scienceillustration/graduate/${graduate.data.slug}`}>
      {`${graduate.data.first_name} ${graduate.data.last_name} (${
        graduate.data.class
      })`}
    </Link>
  </li>
)

class ScienceIllustrationGallerySearch extends React.Component {
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
        `${graduate.node.first_name} ${graduate.node.last_name}`
          .toLowerCase()
          .search(query) > -1
      ) {
        results.push(graduate)
      }
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
          <Flex flexWrap="wrap">
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
              <Submit value="Search" />
            </Box>
          </Flex>
        </form>
        {results.length && (
          <ul>
            {results.map(graduate => (
              <ViewGraduate graduate={graduate.node} />
            ))}
          </ul>
        )}
      </Well>
    )
  }
}

class ScienceIllustrationGalleryPage extends React.Component {
  render() {
    const { data } = this.props
    return (
      <Layout>
        <SiteHeader path="/scienceillustration">
          Science Illustration
        </SiteHeader>
        {data.allCsumbNavigation && (
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
          <ul>
            {data.allAirtable.edges.map(graduate => (
              <ViewGraduate graduate={graduate.node} />
            ))}
          </ul>
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
      filter: { table: { eq: "Graduates" } }
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
            slug
          }
        }
      }
    }
  }
`
