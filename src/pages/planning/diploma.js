import React, { Component } from 'react'
import {
  Layout,
  SiteNavigation,
  SiteHeader,
} from '../../components/layouts/default'
import { graphql, Link } from 'gatsby'
import Container from '../../components/common/container'
import Blocks from '../../templates/blocks'
import { Flex, Box } from '../../components/common/grid'
import { colors } from '../../style'
import { UserContext } from '../../components/contexts/user'
import PageFeedbackContext from '../../components/contexts/page-feedback'
import cediplomaTablet from '../../assets/images/cediploma-tablet.png'
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

function EncryptedLink(props) {
  console.log('context: ' + props.context)
  const employeeNumber = props.context
    ? props.context.user.profile.employeeNumber
    : ''
  console.log('employeeNumber: ' + employeeNumber)
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

  const anchorURL = `${
    process.env.GATSBY_CEDIPLOMA_ENDPOINT
  }/Account/ERLSSO/${hexKey}/${process.env.GATSBY_CEDIPLOMA_CLIENTNUMBER}`

  return (
    <>
      <h3 style={{ marginBottom: '0.5rem' }}>
        <a
          href={
            props.context ? anchorURL : props.data.site.siteMetadata.okta.login
          }
        >
          Register/Download now
        </a>
      </h3>
      {/* <form action={encryptedPostURL} method="post">
        <input type="submit" value="Order/Register for my CeCredential" />
      </form> */}
    </>
  )
}

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
      <a href="/planning/diploma-validation">Credential Validation</a>
    </h3>
    <p>Validate the authenticity of a CeDiploma</p>
    <h3>
      <a href="https://secure.cecredentialtrust.com/cecredential/faq/">
        CeCredential Frequently Asked Questions
      </a>
    </h3>
    <p>View commonly asked questions about the CeDiploma</p>
  </Box>
)

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
        <Layout pageTitle="Diploma">
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
                <h2>Certified Electronic Credential Overview</h2>
                <p>
                  CSUMB now offers Certified Electronic Diplomas and
                  Certificates (CeDiploma) to graduates starting with Spring
                  2020 and forward!
                </p>
                <img src={cediplomaTablet} alt="" />
                <UserContext.Consumer>
                  {context =>
                    context.user.profile !== undefined &&
                    context.user.profile.employeeNumber ? (
                      <EncryptedLink context={context} />
                    ) : (
                      <>
                        <EncryptedLink context={null} data={data} />
                        <p style={{ color: colors.indicators.high }}>
                          In order to use the Register/Download link you must be{' '}
                          <a href={data.site.siteMetadata.okta.login}>
                            logged in
                          </a>{' '}
                          to your CSUMB Account. Once logged in please revisit{' '}
                          <Link to="/diploma">csumb.edu/diploma.</Link>
                        </p>
                      </>
                    )
                  }
                </UserContext.Consumer>
                <p>(There is a $15.95 charge for this service.)</p>
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

export default DiplomaPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "planning" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allCsumbPage(filter: { pagePath: { eq: "planning/diploma" } }) {
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
