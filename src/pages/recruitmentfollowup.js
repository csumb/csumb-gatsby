import React, { useState, useEffect } from 'react'
import {
  Layout,
  SiteHeader,
  SiteNavigation,
  PageTitle,
} from '../components/layouts/default'
import { graphql } from 'gatsby'
import Container from '../components/common/container'
import Iframe from 'react-iframe'

const InquiryPage = ({ location }) => {
  const [pid, setPid] = useState('')
  useEffect(
    () => {
      setPid(location.search)
    },
    [location]
  )
  return (
    <Layout pageTitle="Recruitment Follow Up">
      <SiteHeader path="/admissions">Admissions</SiteHeader>
      <SiteNavigation navigation={null} />
      <Container>
        <PageTitle>Cal State Monterey Bay Follow Up</PageTitle>
        <div id="iFrameWrapper">
          <Iframe
            src={`https://csumb.tfaforms.net/12${pid}`}
            id="followUp"
            height="2000"
            width="100%"
            frameBorder="0"
            onLoad={console.log('Loaded!')}
          />
        </div>
        <script src="//csumb.tfaforms.net/js/iframe_resize_helper.js" />
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
