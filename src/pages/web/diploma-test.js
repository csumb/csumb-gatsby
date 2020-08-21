import React from 'react'
import {
  Layout,
  SiteHeader,
  SiteNavigation,
  PageTitle,
} from '../../components/layouts/default'
import { graphql } from 'gatsby'
import Container from '../../components/common/container'
import Blocks from '../../templates/blocks'
import PageFeedbackContext from '../../components/contexts/page-feedback'
import { UserContext } from '../../components/contexts/user'

const DiplomaPage = props => {
  const data = props
  console.log(`Props: ${JSON.stringify(props)}`)
  return (
    <PageFeedbackContext.Provider
      value={{ email: 'webfolk@csumb.edu', title: 'Diploma', url: '/diploma' }}
    >
      <Layout pageTitle="Test">
        <SiteHeader path="/admissions">Test</SiteHeader>
        <SiteNavigation navigation={null} />
        <Container>
          <PageTitle>This page is for testing purposes only</PageTitle>
          <UserContext.Consumer>
            {context => (
              <h2>UserContext.Consumer: {JSON.stringify(context.user)}</h2>
            )}
          </UserContext.Consumer>
          {data.allCsumbPage &&
            data.allCsumbPage.edges &&
            data.allCsumbPage.edges[0] && (
              <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
            )}
        </Container>
      </Layout>
    </PageFeedbackContext.Provider>
  )
}

export default DiplomaPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "web" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allCsumbPage(filter: { pagePath: { eq: "web/diploma-test" } }) {
      edges {
        node {
          pageContent
          layout
        }
      }
    }
  }
`
