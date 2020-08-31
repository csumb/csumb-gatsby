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
import crypto from 'crypto'

function aesEncrypt(text, key) {
  if (process.versions.openssl <= '1.0.1f') {
    throw new Error('OpenSSL Version too old, vulnerability to Heartbleed')
  }
  const iv = crypto.randomBytes(IVLength)

  const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])

  return iv.toString('hex') + encrypted.toString('hex')
}

function aesDecrypt(text, key) {
  let iv32 = text.substring(0, IVLength * 2)
  let s32 = text.substring(IVLength * 2)
  let iv = new Buffer.from(iv32, 'hex')
  let encryptedText = Buffer.from(s32, 'hex')

  let decipher = crypto.createDecipheriv(
    process.env.GATSBY_CEDIPLOMA_ENCRYPTION_STANDARD,
    Buffer.from(key),
    iv
  )
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}

function EncryptedLink(props) {
  const employeeNumber = process.env.GATSBY_TEST_RECIPIENT_ID
  const utcDateTime = moment()
    .utc()
    .format('YYYY-MM-DD HH:mm:ss')
  const value = employeeNumber + '|' + utcDateTime

  const mask = process.env.GATSBY_CEDIPLOMA_MASK1
  const IVLength = 16
  const privateKey16String = mask.substring(0, IVLength)

  const hexKey =
    process.env.GATSBY_CEDIPLOMA_CLIENTID +
    aesEncrypt(value, privateKey16String) +
    '|P'

  //DISPLAY URLS
  const encryptedPostURL = `${
    process.env.GATSBY_CEDIPLOMA_TEST_ENDPOINT
  }/Account/ERLSSO?hexkey=${hexKey}&cid=${
    process.env.GATSBY_CEDIPLOMA_CLIENTNUMBER
  }`
  const getURL = `${
    process.env.GATSBY_CEDIPLOMA_TEST_ENDPOINT
  }/Account/ERLSSO/${hexKey}/${process.env.GATSBY_CEDIPLOMA_CLIENTNUMBER}`
  console.log(getURL)

  const anchorURL = `${
    process.env.GATSBY_CEDIPLOMA_TEST_ENDPOINT
  }/Account/ERLSSO/${hexKey}/${process.env.GATSBY_CEDIPLOMA_CLIENTNUMBER}`
  // Build example anchor tag to be used for testing
  return (
    <>
      <a href={anchorURL}>AnchorURL</a>
      <form action={encryptedPostURL} method="post">
        <input type="submit" value="Order/Register for my CeCredential" />
      </form>
    </>
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
