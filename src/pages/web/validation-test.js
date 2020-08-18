import React, { Component, useState, useEffect } from 'react'
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

const initialFormData = Object.freeze({
  username: '',
  password: '',
})

const endpoint = process.env.GATSBY_CSUMB_CEDIPLOMA_TEST_ENDPOINT
console.log(endpoint)

const CredentialForm = () => {
  const [formData, updateFormData] = React.useState(initialFormData)

  const handleChange = e => {
    updateFormData({
      ...formData,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(formData)
    console.log(`${endpoint}/${formData.id}/${formData.name}`)
  }

  return (
    <>
      <h1>Hello</h1>
      <label>
        ID
        <input name="id" onChange={handleChange} />
      </label>
      <br />
      <label>
        First two of name
        <input name="name" onChange={handleChange} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
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
        <Layout>
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
            <CredentialForm />
            {/* {data.allCsumbPage &&
              data.allCsumbPage.edges &&
              data.allCsumbPage.edges[0] && (
                <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
              )} */}
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
