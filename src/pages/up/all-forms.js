import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Container from 'components/common/container'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/layouts/sections/navigation/site'
import Blocks from 'templates/blocks'
import { UniversityPersonnelForm } from 'components/pages/university-personnel'
import { InputText, Submit } from 'components/common/forms'
import Well from 'components/common/well'
import PageTitle from 'components/layouts/sections/header/page-title'
import { Flex, Box } from 'components/common/grid'

class UniversityPersonnelAllformsSearch extends Component {
  state = {
    query: false,
    results: false,
  }

  handleSubmit(event) {
    event.preventDefault()
    const query = this.state.query.toLowerCase().trim()
    if (!query.length) {
      this.setState({
        results: false,
      })
      return
    }
    let results = []
    this.props.forms.map(form => {
      if (
        `${form.node.data.Name} ${form.node.data.Notes}`
          .toLowerCase()
          .search(query) > -1
      ) {
        results.push(form.node)
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
          <Flex flexWrap="wrap">
            <Box width={[1, 6 / 12]} px={2}>
              <InputText
                name="search"
                label="Search forms"
                placeholder="Search"
                hideLabel={true}
                onChange={event => {
                  this.setState({
                    query: event.target.value,
                  })
                }}
              />
            </Box>
            <Box width={[1, 3 / 12]}>
              <Submit value="Search" nomargin small />
            </Box>
          </Flex>
        </form>
        {results.length ? (
          <dl>
            {results.map(form => (
              <UniversityPersonnelForm key={form.id} form={form} />
            ))}
          </dl>
        ) : null}
      </Well>
    )
  }
}

class UniversityPersonnelFormsPage extends Component {
  render() {
    const { data } = this.props
    return (
      <Layout pageTitle="University Personnel">
        <SiteHeader path="/up">University Personnel</SiteHeader>
        {data.allCsumbNavigation &&
          data.allCsumbNavigation.edges &&
          data.allCsumbNavigation.edges[0] && (
            <SiteNavigation
              navigation={data.allCsumbNavigation.edges[0].node.navigation}
            />
          )}
        <Container>
          <PageTitle>All forms</PageTitle>
          {data.allCsumbPage && (
            <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
          )}
          {data.allAirtable && (
            <>
              <UniversityPersonnelAllformsSearch
                forms={data.allAirtable.edges}
              />
              <dl>
                {data.allAirtable.edges.map(node => (
                  <UniversityPersonnelForm
                    key={node.node.id}
                    form={node.node}
                  />
                ))}
              </dl>
            </>
          )}
        </Container>
      </Layout>
    )
  }
}

export default UniversityPersonnelFormsPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "up" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allCsumbPage(filter: { pagePath: { eq: "up/all-forms" } }) {
      edges {
        node {
          pageContent
          layout
        }
      }
    }
    allAirtable(
      filter: { queryName: { in: ["UniversityPersonnelDocuments"] } }

      sort: { fields: [data___Name] }
    ) {
      edges {
        node {
          id
          table
          recordId
          data {
            Name
            Notes
            Attachments {
              id
              url
              filename
            }
          }
        }
      }
    }
  }
`
