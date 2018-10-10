import React from 'react'
import Layout from "../components/layouts/default"
import { graphql } from 'gatsby'

const AccessibilityPage = (props) =>  {
  const page = props.data.allMarkdownRemark.edges[0].node
  console.log(page)
  return (
    <Layout pageTitle={page.frontmatter.title}>
      <h1>{page.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.html }}/>
    </Layout>
  )
}

export default AccessibilityPage

export const query = graphql`
{
  allMarkdownRemark(filter: {frontmatter: {name: {eq: "accessibility"}}}) {
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