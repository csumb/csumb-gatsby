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
import styled from '@emotion/styled'

const Disclaimer = styled('div')`
  min-width: 80%;
  margin-bottom: 1.5rem;
  p {
    font-size: 0.75rem;
    text-align: center;
  }
`

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
        <IframeResizer
          src={`https://csumb.tfaforms.net/15${pid}`}
          frameBorder="0"
          style={{ width: '1px', minWidth: '100%', marginBottom: 0 }}
        />
        <Disclaimer>
          <p>
            By submitting this form you are granting CSUMB permission to email
            you information regarding the university.
          </p>
        </Disclaimer>
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
