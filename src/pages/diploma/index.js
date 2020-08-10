import React from 'react'
import {
  Layout,
  SiteHeader,
  SiteNavigation,
  PageTitle,
} from '../../components/layouts/default'
import { graphql } from 'gatsby'
import Container from '../../components/common/container'
import PageFeedbackContext from '../../components/contexts/page-feedback'
import { UserContext } from '../../components/contexts/user'

const DiplomaPage = props => {
  console.log(`Props: ${props}`)
  return (
    <PageFeedbackContext.Provider
      value={{ email: 'webfolk@csumb.edu', title: 'Diploma', url: '/diploma' }}
    >
      <Layout pageTitle="Inquiry Form">
        <SiteHeader path="/admissions">Admissions</SiteHeader>
        <SiteNavigation navigation={null} />
        <Container>
          <PageTitle>This page is for testing purposes only</PageTitle>
          <UserContext.Consumer>
            {context => console.log(`UserContext.Consumer: ${context.user}`)}
          </UserContext.Consumer>
        </Container>
      </Layout>
    </PageFeedbackContext.Provider>
  )
}

export default DiplomaPage

export const query = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { name: { eq: "diploma" } } }) {
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
