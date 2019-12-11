import React from 'react'
import { graphql } from 'gatsby'

const TerminalFourPageListing = ({ data }) => (
  <>
    <h2>Sites</h2>
    <ul>
      {data.allCsumbSite.edges.map(({ node }) => (
        <li>
          <a href={`/${node.site}`}>
            {node.site} - {node.title}
          </a>
        </li>
      ))}
    </ul>
    <h2>Pages</h2>
    <ul>
      {data.allCsumbPage.edges.map(({ node }) => (
        <li>
          <a href={`/${node.pagePath}`}>
            {node.pagePath} - {node.title}
          </a>
        </li>
      ))}
    </ul>
  </>
)

export default TerminalFourPageListing

export const query = graphql`
  {
    allCsumbSite {
      edges {
        node {
          site
          title
        }
      }
    }

    allCsumbPage {
      edges {
        node {
          pagePath
          title
        }
      }
    }
  }
`
