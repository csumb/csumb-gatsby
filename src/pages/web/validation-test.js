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
import { AlertWarning } from '../../components/common/alert'
import { Button } from '../../components/common/button'
import { colors } from '../../style'
import credentialLogo from '../../assets/images/cecredential-logo.png'

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
    <AlertWarning>
      <p>
        We cannot validate the Credential at this time.
        <br />
        The information provided does not match the information on record, or
        there was a connection error.
        <br />
        Please contact *REGISTRAR@SAMPLEUNIVERSITY.EDU* for assistance. When you
        do, please provide the student name and CeDiD.
      </p>
    </AlertWarning>
  )
}

const LabelInputWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;
`

const Label = styled('label')`
  width: 40%;
  font-size: 0.9rem;
  border-radius: 2px;
  padding: 5px;
  background: ${colors.muted.light};
`

const ValidateInput = styled('input')`
  max-width: 50%;
  max-height: 3rem;
  padding: 5px 10px;
  border-radius: 2px;
  border: 1px solid ${colors.gray.default};
  padding: 0.3rem;
  &:focus {
    transition: all 100ms;
    outline: 0.15rem solid ${colors.primary.default};
  }
`

const CredentialValidation = () => {
  const [formData, updateFormData] = useState(initialFormData)
  const [data, setData] = useState({ credential: {} })

  const handleChange = e => {
    var foo = e.target.value.split('-').join('')
    if (foo.length > 0) {
      foo = foo.match(new RegExp('.{1,4}', 'g')).join('-')
    }
    e.target.value = foo
    updateFormData({
      ...formData,
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
      <Flex style={{ maxWidth: '500px', marginBottom: '20px' }}>
        <LabelInputWrapper>
          <Label htmlFor="id">
            Please enter CeDiD <br />
            <span>(not case sensitive)</span>
          </Label>
          <ValidateInput
            maxLength="14"
            name="id"
            placeholder="_ _ _ _ - _ _ _ _ - _ _ _ _"
            onChange={handleChange}
          />
        </LabelInputWrapper>
        <LabelInputWrapper>
          <Label htmlFor="name">
            Enter the first two letters of the name as it appears on the
            credential
          </Label>
          <ValidateInput
            maxLength="2"
            name="name"
            placeholder="_ _"
            onChange={handleChange}
          />
        </LabelInputWrapper>
        <Button onClick={handleSubmit}>Validate</Button>
      </Flex>
      <img src={credentialLogo} alt="Powered by CeCredential Trust" />
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
            <CredentialValidation />
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
