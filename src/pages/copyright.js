import React from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import PageTitle from 'components/page-title'
import Container from 'components/container'

const CopyrightPage = props => {
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

export default CopyrightPage

export const query = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { name: { eq: "copyright" } } }) {
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
