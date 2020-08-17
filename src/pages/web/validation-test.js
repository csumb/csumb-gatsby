import React, { Component } from 'react'
import {
  Layout,
  SiteHeader,
  SiteNavigation,
} from '../../components/layouts/default'
import Container from '../../components/common/container'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { Flex, Box } from '../../components/common/grid'
import Well from '../../components/common/well'
import { InputText, Submit } from '../../components/common/forms'
import styled from '@emotion/styled'
import Blocks from '../../templates/blocks'
import PageFeedbackContext from '../../components/contexts/page-feedback'

class CredentialSearch extends Component {
  render() {
    return (
      <Well>
        <form
          method="GET"
          action="https://csumb.teamdynamix.com/TDClient/Shared/Search/?c=sc"
        >
          <h2>Search our services</h2>
          <Flex>
            <Box width={[1, 8 / 12]} pr={[0, 2]}>
              <InputText
                name="s"
                label="Search our services"
                placeholder="Search"
                hideLabel={true}
              />
            </Box>
            <Box width={[1, 4 / 12]}>
              <Submit value="Search" nomargin={true} small />
            </Box>
          </Flex>
        </form>
      </Well>
    )
  }
}

class ITPage extends Component {
  render() {
    const { data } = this.props
    return (
      <PageFeedbackContext.Provider
        value={{
          email: 'webfolk@csumb.edu',
          title: 'Credential Validation',
          url: '/web/validation-test',
        }}
      >
        <Layout
          pageTitle="Credential Validation"
          siteTitle="Credential Validation"
          isSiteHomepage={true}
          siteNavigation={data.allCsumbNavigation.edges[0].node.navigation}
        >
          <SiteHeader path="/web/validation-test">
            Credential Validation
          </SiteHeader>
          {data.allCsumbNavigation &&
            data.allCsumbNavigation.edges &&
            data.allCsumbNavigation.edges[0] && (
              <SiteNavigation
                navigation={data.allCsumbNavigation.edges[0].node.navigation}
              />
            )}
          <Container topPadding>
            <CredentialSearch />
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
}

export default ITPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "it" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allCsumbPage(filter: { pagePath: { eq: "web/validation-test" } }) {
      edges {
        node {
          pageContent
          layout
        }
      }
    }
  }
`
