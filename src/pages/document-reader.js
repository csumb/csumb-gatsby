import React from 'react'
import Layout from "../components/layouts/default"
import { graphql } from 'gatsby'

const Page = (props) =>  {
  const page = props.data.allMarkdownRemark.edges[0].node
  console.log(page)
  return (
    <Layout>
      <h1>{page.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.html }}/>
    </Layout>
  )
}

export default Page

export const query = graphql`
{
  allMarkdownRemark(filter: {frontmatter: {name: {eq: "document-reader"}}}) {
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