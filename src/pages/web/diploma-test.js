import React, { Component } from 'react'
import {
  Layout,
  SiteNavigation,
  SiteHeader,
} from '../../components/layouts/default'
import { graphql } from 'gatsby'
import Container from '../../components/common/container'
import Blocks from '../../templates/blocks'
import PageFeedbackContext from '../../components/contexts/page-feedback'
import { UserContext } from '../../components/contexts/user'
import moment from 'moment'
import CryptoJS from 'crypto-js'
const crypto = require('crypto')

function EncryptedLink(props) {
  // StudentId + pipe symbol + UTC DateTime is used to prevent "replay attacks"
  const employeeNumber = process.env.GATSBY_TEST_RECIPIENT_ID
  const utcDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
  console.log(utcDateTime)
  const mask = process.env.GATSBY_CEDIPLOMA_MASK1
  // Only use the first 16 chars (16 bytes) of MASK1 for AES128
  const privateKey16String = mask.substring(0, 16)
  const value = employeeNumber + '|' + utcDateTime

  let cipher = crypto.createCipher('aes128', privateKey16String)
  const crypted = cipher.update(value, 'utf-8', 'hex') + cipher.final('hex')

  let uncipher = crypto.createDecipher('aes128', privateKey16String)
  const decrypted =
    uncipher.update(crypted, 'hex', 'utf-8') + uncipher.final('utf-8')

  const hexKey = process.env.GATSBY_CEDIPLOMA_CLIENTID + crypted + '|P'
  const encryptedURL = `${
    process.env.GATSBY_CEDIPLOMA_TEST_ENDPOINT
  }/Account/ERLSSO?hexkey=${hexKey}&cid=${
    process.env.GATSBY_CEDIPLOMA_CLIENTNUMBER
  }`
  const getURL = `${
    process.env.GATSBY_CEDIPLOMA_TEST_ENDPOINT
  }/Account/ERLSSO/${hexKey}/${
    process.env.GATSBY_CEDIPLOMA_CLIENTNUMBER
  }|D/1334`
  // Build example anchor tag to be used for testing
  console.log(getURL)
  return (
    <form action={encryptedURL} method="post">
      <input type="submit" value="Order/Register for my CeCredential" />
    </form>
  )
}

class DiplomaPage extends Component {
  render() {
    const { data } = this.props
    return (
      <PageFeedbackContext.Provider
        value={{
          email: 'webfolk@csumb.edu',
          title: 'Diploma',
          url: '/diploma',
        }}
      >
        <Layout pageTitle="Test">
          <SiteHeader path="/web">Web Services</SiteHeader>

          {data.allCsumbNavigation &&
            data.allCsumbNavigation.edges &&
            data.allCsumbNavigation.edges[0] && (
              <SiteNavigation
                navigation={data.allCsumbNavigation.edges[0].node.navigation}
              />
            )}
          <Container topPadding>
            <UserContext.Consumer>
              {context => (
                <>
                  <EncryptedLink />
                  <p>You must be logged in to register</p>
                </>
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
