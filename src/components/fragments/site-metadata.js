import { graphql } from 'gatsby'

export const siteMetadata = graphql`
fragment siteMetadata on Query {
    site {
      siteMetadata {
        swiftypeId
      }
    }
  }
`