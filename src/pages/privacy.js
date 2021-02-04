import React from 'react'
import { Layout, PageTitle } from '../components/layouts/default'
import { graphql } from 'gatsby'
import Container from '../components/common/container'
import Breadcrumbs from '../components/layouts/sections/header/breadcrumbs'

const PrivacyPage = props => {
  const page = props.data.allMarkdownRemark.edges[0].node
  return (
    <Layout pageTitle={page.frontmatter.title}>
      <Container>
        <Breadcrumbs
          breadcrumbs={`[{ "href": "/", "title": "CSUMB Home" }]`}
          currentUrl="/privacy"
          currentPage={page.frontmatter.title}
        />
        <PageTitle>{page.frontmatter.title}</PageTitle>
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      </Container>
    </Layout>
  )
}

export default PrivacyPage

export const query = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { name: { eq: "privacy" } } }) {
      edges {
        node {
          frontmatter {
            name
            title
          }
          html
        }
      }
    }
  }
`
