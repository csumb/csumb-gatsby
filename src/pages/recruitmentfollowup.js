import React from 'react'
import {
  Layout,
  SiteHeader,
  SiteNavigation,
  PageTitle,
} from '../components/layouts/default'
import { graphql } from 'gatsby'
import Container from '../components/common/container'

const InquiryPage = () => {
  return (
    <Layout pageTitle="Recruitment Follow Up">
      <SiteHeader path="/admissions">Admissions</SiteHeader>
      <SiteNavigation navigation={null} />
      <Container>
        <PageTitle>Cal State Monterey Bay Follow Up</PageTitle>
        <div>
        <iframe src="https://csumb.tfaforms.net/12" height="2000" width="100%"
        frameborder="0" ></iframe>
        <script src="//csumb.tfaforms.net/js/iframe_resize_helper.js"></script>
        </div>
      </Container>
    </Layout>
  )
}

export default InquiryPage

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { name: { eq: "recruitmentFollowup" } } }
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