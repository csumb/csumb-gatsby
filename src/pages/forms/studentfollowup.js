import React, { useState, useEffect } from 'react'
import {
  Layout,
  SiteHeader,
  SiteNavigation,
  PageTitle,
} from '../../components/layouts/default'
import { graphql } from 'gatsby'
import Container from '../../components/common/container'
import IframeResizer from 'iframe-resizer-react'
import PageFeedbackContext from '../../components/contexts/page-feedback'

const InquiryPage = ({ location }) => {
  const [pid, setPid] = useState('')
  useEffect(
    () => {
      setPid(location.search)
    },
    [location]
  )
  return (
    <PageFeedbackContext.Provider
      value={{
        email: 'webfolk@csumb.edu',
        title: 'Student followup form',
        url: '/forms/studentfollowup',
      }}
    >
      <Layout pageTitle="Recruitment Follow Up">
        <SiteHeader path="/admissions">Admissions</SiteHeader>
        <SiteNavigation navigation={null} />
        <Container>
          <PageTitle>Cal State Monterey Bay Follow Up</PageTitle>
          <IframeResizer
            src={`https://csumb.tfaforms.net/15${pid}`}
            frameBorder="0"
            style={{ width: '1px', minWidth: '100%', marginBottom: 0 }}
            sandbox="allow-top-navigation allow-same-origin allow-forms allow-popups allow-scripts"
            target="_top"
          />
          <script src="https://csumb.tfaforms.net/js/iframe_resize_helper.js" />
        </Container>
      </Layout>
    </PageFeedbackContext.Provider>
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
