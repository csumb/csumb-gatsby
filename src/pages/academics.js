import React from 'react'
import Layout from '../components/layouts/default'
import Link from 'gatsby-link'
import { graphql } from "gatsby"

export default ({ data }) => (
  <Layout>
    <h1>Academics</h1>
    {data.allGoogleSheetSheet1Row.edges.map((row, i) => (
      <p>
        <Link to={row.node.link.replace('https://csumb.edu/', '/')}>
          {row.node.name}
        </Link>
        {row.node.description}
      </p>
    ))}
  </Layout>
)

export const query = graphql`
  {
    allGoogleSheetSheet1Row {
      edges {
        node {
          name
          program
          link
          id
          description
        }
      }
    }
  }`