import React from 'react'
import {
  Layout,
  SiteHeader,
  SiteNavigation,
  PageTitle,
} from '../../components/layouts/default'
import { graphql } from 'gatsby'
import Container from '../../components/common/container'
import IframeResizer from 'iframe-resizer-react'

const InquiryPage = () => {
  return (
    <Layout pageTitle="Inquiry Form">
      <SiteHeader path="/admissions">Admissions</SiteHeader>
      <SiteNavigation navigation={null} />
      <Container>
        <PageTitle>Cal State Monterey Bay Request Information Form</PageTitle>
        <IframeResizer
          src={`https://csumb.tfaforms.net/3`}
          frameBorder="0"
          style={{ width: '1px', minWidth: '100%', marginBottom: 0 }}
          sandbox="allow-top-navigation allow-same-origin allow-forms allow-popups allow-scripts"
          target="_top"
        />
        <script src="https://csumb.tfaforms.net/js/iframe_resize_helper.js" />
      </Container>
    </Layout>
  )
}

export default InquiryPage

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { name: { eq: "inquiryform" } } }
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
