import React from 'react'
import Layout from "../components/layouts/default"
import { graphql } from 'gatsby'

const CopyrightPage = (props) =>  {
  const page = props.data.allMarkdownRemark.edges[0].node
  return (
    <Layout pageTitle={page.frontmatter.title}>
      <h1>{page.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.html }}/>
    </Layout>
  )
}

export default CopyrightPage

export const query = graphql`
{
  allMarkdownRemark(filter: {frontmatter: {name: {eq: "copyright"}}}) {
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