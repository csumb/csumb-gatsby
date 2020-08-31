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
import moment from 'moment'
import crypto from 'crypto'

const IVLength = 16

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
  const employeeNumber = props.context
    ? props.context.user.profile.employeeNumber
    : ''
  const utcDateTime = moment()
    .utc()
    .format('YYYY-MM-DD HH:mm:ss')
  const value = employeeNumber + '|' + utcDateTime

  const mask = process.env.GATSBY_CEDIPLOMA_MASK1
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

  const anchorURL = `${
    process.env.GATSBY_CEDIPLOMA_TEST_ENDPOINT
  }/Account/ERLSSO/${hexKey}/${process.env.GATSBY_CEDIPLOMA_CLIENTNUMBER}`

  return (
    <>
      <h3>
        <a href={props.context ? anchorURL : '#'}>Register/Download now</a>
      </h3>
      {/* <form action={encryptedPostURL} method="post">
        <input type="submit" value="Order/Register for my CeCredential" />
      </form> */}
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
            <EncryptedLink />
            {!data.context && (
              <h6>
                You must be{' '}
                <a href={data.site.siteMetadata.okta.login}>logged in</a> to
                order/register
              </h6>
            )}
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
    site {
      siteMetadata {
        okta {
          login
        }
      }
    }
  }
`
