import React from 'react'
import { Layout, PageTitle, SiteHeader, SiteNavigation } from 'components/layouts/default'
import { graphql } from 'gatsby'
import Container from 'components/common/container'

const PrivacyPage = props => {
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
