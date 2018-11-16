import React from 'react'
import Layout from 'components/layouts/default'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { navigate } from '@reach/router'
import { InputText, Submit } from 'components/forms'
import styled from 'react-emotion'
import { colors } from 'components/styles/theme'
import { Flex, Box } from '@rebass/grid/emotion'
import { LeadParagraph } from 'components/type'
import { UnstyledList } from 'components/type'
import Container from 'components/container'
import SiteHeader from 'components/layouts/components/site-header'
import PageTitle from 'components/page-title'
import AllPrograms from 'static/all-programs.js'

const SearchSubmit = styled(Submit)`
  margin: 0;
  padding: 1.3rem;
`

const ResultItem = styled('li')`
  border: 1px solid ${colors.gray.light};
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`

const AcademicsResults = ({ results }) => (
  <UnstyledList>
    {results.map(result => (
      <>
        {result.row.name !== result.row.program && (
          <ResultItem>
            <LeadParagraph>
              You can study {result.row.name} in{' '}
              <Link to={result.row.link}>{result.row.program}</Link>
            </LeadParagraph>
            <p>{result.row.description}</p>
          </ResultItem>
        )}
      </>
    ))}
  </UnstyledList>
)
class AcademicsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      filteredItems: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    navigate(`?f=${this.state.filter}`)

    if (this.state.filter.trim().length < 3) {
      return
    }
    //Filter all the rows from the sheet and add them to the component's filteredItems state
    var filteredItems = []
    this.props.data.allGooglePublicSheet.edges.map(row => {
      if (row.node.row.name.toLowerCase().search(this.state.filter) > -1) {
        filteredItems.push(row.node)
      }
      return filteredItems
    })
    this.setState({
      filteredItems: filteredItems,
    })
  }

  handleChange(event) {
    this.setState({
      filter: event.target.value,
    })
  }

  render() {
    return (
      <Layout pageTitle="Academics">
        <SiteHeader path="/academics">Academics</SiteHeader>
        <Container>
          <PageTitle layout="page">Majors &amp; Programs</PageTitle>
          <AllPrograms />
          <LeadParagraph>
            Some of our majors have unusual names, if you don't see what you are
            looking for, try searching below.
          </LeadParagraph>
          <form onSubmit={this.handleSubmit}>
            <Flex flexWrap="wrap">
              <Box width={[1, 8 / 10]} px={2}>
                <InputText
                  placeholder="Search"
                  label="Search majors and programs"
                  hideLabel={true}
                  onChange={this.handleChange}
                  huge
                />
              </Box>
              <Box width={[1, 2 / 10]} px={2}>
                <SearchSubmit value="Search" />
              </Box>
            </Flex>
          </form>
          {this.state.filteredItems.length && (
            <AcademicsResults results={this.state.filteredItems} />
          )}
        </Container>
      </Layout>
    )
  }
}

export default AcademicsPage

export const query = graphql`
  {
    allGooglePublicSheet {
      edges {
        node {
          id
          row {
            name
            program
            link
            description
          }
        }
      }
    }
  }
`
