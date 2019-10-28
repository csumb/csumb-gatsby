import CashnetPage from './index'
import { graphql } from 'gatsby'

export default CashnetPage
export const query = graphql`
  {
    site {
      siteMetadata {
        okta {
          login
        }
      }
    }
  }
`
