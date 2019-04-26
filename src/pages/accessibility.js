import React from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import PageTitle from 'components/layouts/sections/header/page-title'
import Container from 'components/common/container'

const AccessibilityPage = props => {
  const page = props.data.allMarkdownRemark.edges[0].node
  return (
    <Layout pageTitle={page.frontmatter.title}>
      <Container>
        <PageTitle>{page.frontmatter.title}</PageTitle>
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      </Container>
    </Layout>
  )
}

export default AccessibilityPage

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { name: { eq: "accessibility" } } }
    ) {
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
