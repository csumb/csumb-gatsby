import React, { Component } from 'react'
import { Layout, SiteHeader, SiteNavigation } from 'components/layouts/default'
import Container from 'components/common/container'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { Flex, Box } from 'components/common/grid'
import Well from 'components/common/well'
import { ITSystemStatus, ITAlerts } from 'components/pages/it'
import { InputText, Submit } from 'components/common/forms'
import styled from '@emotion/styled'
import Blocks from 'templates/blocks'

const ITServiceHeader = styled.h3`
  margin-bottom: 0.4rem;
`

const HelpFlex = styled(Flex)`
  margin: 2rem 0 1.5rem;
`

class ITSearch extends Component {
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
      <Layout
        pageTitle="Information Technology"
        siteTitle="Information Technology"
        isSiteHomepage={true}
      >
        <SiteHeader path="/it">Information Technology</SiteHeader>
        {data.allCsumbNavigation &&
          data.allCsumbNavigation.edges &&
          data.allCsumbNavigation.edges[0] && (
            <SiteNavigation
              navigation={data.allCsumbNavigation.edges[0].node.navigation}
            />
          )}
        <Container topPadding>
          <ITSearch />
          <HelpFlex>
            <Box width={[1, 1 / 4]} pr={[0, 3]}>
              <ITServiceHeader>Call us</ITServiceHeader>
              <p>
                Call 831-582-4357 (HELP)
                <br />
                Monday - Friday 8 a.m. to 5 p.m.
              </p>
            </Box>
            <Box width={[1, 1 / 4]} pr={[0, 3]}>
              <ITServiceHeader>Visit us </ITServiceHeader>
              <p>
                <Link to="it/library-it-service-desk">
                  Drop by our service desk
                </Link>{' '}
                at the Library.
              </p>
            </Box>
            <Box width={[1, 1 / 4]} pr={[0, 3]}>
              <ITServiceHeader>Drop in Open Labs</ITServiceHeader>
              <p>
                Come by our monthly{' '}
                <Link to="/web/technology-open-lab">Technology Open Labs</Link>.
              </p>
            </Box>
            <Box width={[1, 1 / 4]}>
              <ITServiceHeader>Alerts</ITServiceHeader>
              <ITAlerts />
            </Box>
          </HelpFlex>
          <Flex>
            <Box width={[1, 2 / 3]} pr={[0, 4]}>
              <h2>Popular Services</h2>
              <ITServiceHeader>
                <Link to="it/accounts-and-passwords">Your account</Link>
              </ITServiceHeader>
              <p>
                Claim a new CSUMB username, remember your password, and fix
                issues with your account.
              </p>
              <ITServiceHeader>
                <a href="https://csumb.teamdynamix.com/TDClient/Requests/ServiceCatalog?CategoryID=8800">
                  Software
                </a>
              </ITServiceHeader>
              <p>
                Get new software installed on your computer, or fix a software
                issue.
              </p>
              <ITServiceHeader>
                <a href="https://csumb.teamdynamix.com/TDClient/Requests/ServiceCatalog?CategoryID=8798">
                  Hardware &amp; moving your computer{' '}
                </a>
              </ITServiceHeader>
              <p>
                Request a new computer, move one to a new location, or fix a
                physical problem with your device.
              </p>
              <ITServiceHeader>
                <a href="https://csumb.teamdynamix.com/TDClient/Requests/ServiceCatalog?CategoryID=8799">
                  Printing
                </a>
              </ITServiceHeader>
              <p>Fix your printer or a printer in a lab.</p>
              <ITServiceHeader>
                <a href="https://csumb.teamdynamix.com/TDClient/Requests/ServiceCatalog?CategoryID=5747">
                  Telephones &amp; voicemail
                </a>
              </ITServiceHeader>
              <p>
                Manage your voicemail, get new phone numbers, and move phones.
              </p>
              <ITServiceHeader>
                <a href="https://csumb.teamdynamix.com/TDClient/Requests/ServiceCatalog?CategoryID=5598">
                  Internet
                </a>
              </ITServiceHeader>
              <p>
                Log into the campus network, and fix issues with getting online.
              </p>
              <ITServiceHeader>
                <a href="https://csumb.teamdynamix.com/TDClient/Requests/ServiceCatalog">
                  Full list of services
                </a>
              </ITServiceHeader>
              <p>Browse the complete list of services and submit a ticket.</p>
            </Box>
            <Box width={[1, 1 / 3]}>
              <h2>System status</h2>
              <ITSystemStatus />
            </Box>
          </Flex>
          {data.allCsumbPage &&
            data.allCsumbPage.edges &&
            data.allCsumbPage.edges[0] && (
              <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
            )}
        </Container>
      </Layout>
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
    allCsumbPage(filter: { layout: { eq: "site" }, site: { eq: "it" } }) {
      edges {
        node {
          pageContent
          layout
        }
      }
    }
  }
`
