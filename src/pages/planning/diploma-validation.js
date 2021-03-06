import React, { Component, useState } from 'react'
import {
  Layout,
  SiteHeader,
  SiteNavigation,
} from '../../components/layouts/default'
import Container from '../../components/common/container'
import { graphql } from 'gatsby'
import { Flex, Box } from '../../components/common/grid'
import styled from '@emotion/styled'
import Blocks from '../../templates/blocks'
import { Table, TableRow, TableCell } from '../../components/common/table'
import PageFeedbackContext from '../../components/contexts/page-feedback'
import { AlertWarning } from '../../components/common/alert'
import { Button } from '../../components/common/button'
import { colors, bp } from '../../style'
import credentialLogo from '../../assets/images/cecredential-logo.png'
import moment from 'moment'

const DiplomaSidebar = () => (
  <Box width={[1, 4 / 12]} pr={[0, 4]}>
    <h2>Related Pages</h2>
    <h3>
      <a href="https://secure.cecredentialtrust.com/cecredential/overview/">
        CeDiploma Features
      </a>
    </h3>
    <p>Learn more about the security features of a CeDiploma</p>
    <h3>
      <a href="/planning/diploma">Credential Overview</a>
    </h3>
    <p>Learn more about CeDiploma and register</p>
    <h3>
      <a href="https://secure.cecredentialtrust.com/cecredential/faq/">
        CeCredential Frequently Asked Questions
      </a>
    </h3>
    <p>View commonly asked questions about the CeDiploma</p>
  </Box>
)

const initialFormData = Object.freeze({
  id: '',
  name: '',
})

const resultTable = credential => {
  return (
    <div style={{ marginBottom: '50px' }}>
      {credential.ValidStatus === 'VALID' ? (
        <div>
          <h4>This is a Valid Credential</h4>
          <h6>
            Validated:{' '}
            {moment()
              .utc()
              .format('ddd, D MMMM YYYY HH:mm:ss')}
            {' GMT'}
          </h6>
          <Table alternateRows={true}>
            <tbody>
              <TableRow>
                <TableCell>CeDiD:</TableCell>
                <TableCell>{credential.CeDiplomaID}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name:</TableCell>
                <TableCell>{credential.Name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Conferral Date:</TableCell>
                <TableCell>{credential.ConferralDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Credential:</TableCell>
                <TableCell>
                  {credential.Degree1}
                  <br />
                  {credential.Major1}
                </TableCell>
              </TableRow>
            </tbody>
          </Table>
        </div>
      ) : (
        <AlertWarning>
          <p>
            We cannot validate the Credential at this time.
            <br />
            The information provided does not match the information on record,
            or there was a connection error.
            <br />
            Please contact{' '}
            <a
              href="mailto:graduation@csumb.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              graduation@csumb.edu
            </a>{' '}
            for assistance. When you do, please provide the student name and
            CeDiD.
          </p>
        </AlertWarning>
      )}
    </div>
  )
}

const LabelInputWrapper = styled('div')`
  display: flex;
  ${bp({
    flexDirection: ['column', 'column', 'row', 'row'],
  })};
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;

  label {
    ${bp({
      width: ['75%', '75%', '50%', '50%'],
    })};
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    border-radius: 2px;
    padding: 5px;
    background: ${colors.muted.light};
  }

  input {
    max-width: 75%;
    max-height: 3rem;
    border-radius: 2px;
    border: 1px solid ${colors.gray.default};
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    &:focus {
      transition: all 100ms;
      outline: 0.15rem solid ${colors.primary.default};
    }
  }
`

const CredentialValidation = () => {
  const [formData, updateFormData] = useState(initialFormData)
  const [data, setData] = useState({ credential: {} })

  const handleChange = e => {
    // Add dashes to input text
    var val = e.target.value.split('-').join('')
    if (val.length > 0) {
      val = val.match(new RegExp('.{1,4}', 'g')).join('-')
    }
    e.target.value = val

    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (formData) {
      const endpoint = `${process.env.GATSBY_CEDIPLOMA_VALIDATE_ENDPOINT}/${
        process.env.GATSBY_CEDIPLOMA_CLIENTID
      }/${formData.id}/${formData.name}`
      fetch(endpoint, {
        method: 'GET',
        dataType: 'JSON',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
        .then(response => response.json())
        .then(data => {
          setData({ credential: data[0] })
        })
    }
  }

  return (
    <>
      <Flex style={{ margin: '0 1rem 20px 1rem' }}>
        <h2>Credential Validation</h2>
        <LabelInputWrapper>
          <label htmlFor="id">
            Please enter CeDiD <br />
            <span>(not case sensitive)</span>
          </label>
          <input
            maxLength="14"
            size="14"
            name="id"
            placeholder="_ _ _ _ - _ _ _ _ - _ _ _ _"
            onChange={handleChange}
          />
        </LabelInputWrapper>
        <LabelInputWrapper>
          <label htmlFor="name">
            Enter the first two letters of the name as it appears on the
            credential
          </label>
          <input
            maxLength="2"
            size="2"
            name="name"
            placeholder="_ _"
            onChange={handleChange}
          />
        </LabelInputWrapper>
        <Button onClick={handleSubmit}>Validate</Button>
      </Flex>
      <img
        src={credentialLogo}
        alt="Powered by CeCredential Trust"
        style={{ margin: '1rem' }}
      />
      {Object.keys(data.credential).length !== 0 &&
        resultTable(data.credential)}
    </>
  )
}

class ValidationPage extends Component {
  render() {
    const { data } = this.props
    return (
      <PageFeedbackContext.Provider
        value={{
          email: 'webfolk@csumb.edu',
          title: 'Validation',
          url: '/web/validation-test',
        }}
      >
        <Layout pageTitle="Diploma Validation">
          <SiteHeader path="/planning">Classes & Planning</SiteHeader>
          {data.allCsumbNavigation &&
            data.allCsumbNavigation.edges &&
            data.allCsumbNavigation.edges[0] && (
              <SiteNavigation
                navigation={data.allCsumbNavigation.edges[0].node.navigation}
              />
            )}
          <Container topPadding>
            <Flex>
              <DiplomaSidebar />
              <Box width={[1, 8 / 12]}>
                <CredentialValidation />
                {data.allCsumbPage &&
                  data.allCsumbPage.edges &&
                  data.allCsumbPage.edges[0] && (
                    <Blocks
                      blocks={data.allCsumbPage.edges[0].node.pageContent}
                    />
                  )}
              </Box>
            </Flex>
          </Container>
        </Layout>
      </PageFeedbackContext.Provider>
    )
  }
}

export default ValidationPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "planning" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allCsumbPage(filter: { pagePath: { eq: "planning/diploma-validation" } }) {
      edges {
        node {
          pageContent
          layout
        }
      }
    }
  }
`
