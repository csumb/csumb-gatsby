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
  id: '',
  name: '',
})

const resultTable = credential => {
  return credential.ValidStatus === 'VALID' ? (
    <div>
      <h5>This is a Valid Credential</h5>
      <ul>
        <li>CeDiD: {credential.CeDiplomaID}</li>
        <li>Name: {credential.Name}</li>
        <li>Conferral Date: {credential.ConferralDate}</li>
        <li>Credential: {credential.Degree1}</li>
        <li>{credential.Major1}</li>
      </ul>
    </div>
  ) : (
    <h5>This is not a valid credential.</h5>
  )
}

const CredentialForm = () => {
  const [formData, updateFormData] = useState(initialFormData)
  const [data, setData] = useState({ credential: {} })

  const handleChange = e => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (formData) {
      fetch(
        `${process.env.GATSBY_CSUMB_CEDIPLOMA_TEST_ENDPOINT}/${formData.id}/${
          formData.name
        }`,
        {
          method: 'GET',
          dataType: 'JSON',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      )
        .then(response => response.json())
        .then(data => {
          // console.log(data[0])
          setData({ credential: data[0] })
        })
    }
  }
  console.log(Object.keys(data.credential))

  return (
    <>
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
      {Object.keys(data.credential).length !== 0 &&
        resultTable(data.credential)}
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
