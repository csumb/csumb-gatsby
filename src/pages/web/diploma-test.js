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

function EncryptedLink(props) {
  // Encrypt data and build HEXKEY
  // StudentId + pipe symbol + UTC DateTime is used to prevent "replay attacks"
  const employeeNumber = props.context.user.profile.employeeNumber
  const utcDateTime = moment('yyyy-MM-dd HH:mm:ss”')
  // Only use the first 16 chars (16 bytes) of MASK1 for AES128
  const mask = process.env.GATSBY_CEDIPLOMA_MASK1
  const privateKey16String = mask.substring(0, 16)
  const cipher = employeeNumber + '|' + utcDateTime
  //this line needs to be changed - node version of encrypt_openssl?
  const encryptedHexString = CryptoJS.AES.decrypt(cipher, privateKey16String)

  const hexKey =
    process.env.GATSBY_CEDIPLOMA_CLIENTID + encryptedHexString + '|P'
  const encryptedURL =
    process.env.GATSBY_CEDIPLOMA_TEST_ENDPOINT +
    '/' +
    hexKey +
    '/' +
    process.env.GATSBY_CEDIPLOMA_CLIENTNUMBER
  // Build example anchor tag to be used for testing
  return <a href={encryptedURL}>{props.context.user.profile.employeeNumber}</a>
}

class DiplomaPage extends Component {
  render() {
    const { data } = this.props
    console.log(`Props: ${JSON.stringify(data)}`)
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
              {context =>
                context.user.profile !== undefined &&
                context.user.profile.employeeNumber ? (
                  <>
                    <EncryptedLink context={context} />
                    <p>
                      context.user.profile.employeeNumber:{' '}
                      {context.user.profile.employeeNumber}
                    </p>
                  </>
                ) : (
                  <p>You must be logged in to register</p>
                )
              }
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
