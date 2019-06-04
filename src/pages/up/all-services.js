import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Container from 'components/common/container'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/layouts/sections/navigation/site'
import Well from 'components/common/well'
import styled from '@emotion/styled'
import PageTitle from 'components/layouts/sections/header/page-title'
import { UniversityPersonnelPages } from 'components/pages/university-personnel'

const allServicesPageId = 21910

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

const Letter = styled.a`
  display: inline-block;
  margin-right: 0.5rem;
`

class UniversityPersonnelServicesPage extends Component {
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
          <PageTitle>Index</PageTitle>
          <Well>
            {alphabet.map(letter => (
              <Letter href={`#letter-${letter}`}>{letter.toUpperCase()}</Letter>
            ))}
          </Well>
          <UniversityPersonnelPages
            pages={data.allAirtable.edges}
            parentId={allServicesPageId}
          />
        </Container>
      </Layout>
    )
  }
}

export default UniversityPersonnelServicesPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "up" } }) {
      edges {
        node {
          navigation
        }
      }
    }

    allAirtable(
      filter: { queryName: { in: ["UniversityPersonnelPages"] } }
      sort: { fields: [data___Name] }
    ) {
      edges {
        node {
          id
          table
          recordId
          data {
            Name
            Content
            Page_ID
            Link
            Parent {
              id
              data {
                Page_ID
                Name
                Notes
                Link
              }
            }
          }
        }
      }
    }
  }
`
