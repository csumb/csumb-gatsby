import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/site-header'
import Container from 'components/container'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { Flex, Box } from '@rebass/grid/emotion'
import SiteNavigation from 'components/site-navigation'
import { InputText, Submit } from 'components/forms'

class ITSearch extends React.Component {
  render() {
    return (
      <form
        method="GET"
        action="https://csumb.teamdynamix.com/TDClient/Shared/Search/?c=sc"
      >
        <h2>Search our services</h2>
        <Flex flexWrap="wrap">
          <Box width={[1, 8 / 12]} px={2}>
            <InputText
              name="s"
              label="Search our services"
              placeholder="Search"
              hideLabel={true}
              huge
            />
          </Box>
          <Box width={[1, 4 / 12]} px={2}>
            <Submit value="Search" nomargin={true} huge />
          </Box>
        </Flex>
      </form>
    )
  }
}

class ITPage extends React.Component {
  render() {
    const { data } = this.props
    return (
      <Layout pageTitle="Information Technology">
        <SiteHeader path="/it">Information Technology</SiteHeader>
        {data.allCsumbContentNavigation && (
          <SiteNavigation
            navigation={data.allCsumbContentNavigation.edges[0].node.navigation}
          />
        )}
        <Container>
          <ITSearch />
          <Flex flexWrap="wrap">
            <Box width={[1, 1 / 3]} px={2}>
              <h3>Call us</h3>
              <p>
                Call 831-582-4357 (HELP)
                <br />
                Monday - Friday 8 a.m. to 5 p.m.
              </p>
            </Box>
            <Box width={[1, 1 / 3]} px={2}>
              <h3>Visit us </h3>
              <p>
                <Link to="it/library-it-service-desk">
                  Drop by our service desk
                </Link>{' '}
                at the Library.
              </p>
            </Box>
            <Box width={[1, 1 / 3]} px={2}>
              <h3>Drop in Open Labs</h3>
              <p>
                Come by our weekly{' '}
                <Link to="it/technology-open-lab">Technology Open Labs</Link>.
              </p>
            </Box>
          </Flex>
          <h2>Popular Services</h2>
          <h3>
            <Link to="it/accounts-and-passwords">Your account</Link>
          </h3>
          <p>
            Claim a new CSUMB username, remember your password, and fix issues
            with your account.
          </p>
          <h3>
            <a href="https://csumb.teamdynamix.com/TDClient/Requests/ServiceCatalog?CategoryID=8800">
              Software
            </a>
          </h3>
          <p>
            Get new software installed on your computer, or fix a software
            issue.
          </p>
          <h3>
            <a href="https://csumb.teamdynamix.com/TDClient/Requests/ServiceCatalog?CategoryID=8798">
              Hardware &amp; moving your computer{' '}
            </a>
          </h3>
          <p>
            Request a new computer, move one to a new location, or fix a
            physical problem with your device.
          </p>
          <h3>
            <a href="https://csumb.teamdynamix.com/TDClient/Requests/ServiceCatalog?CategoryID=8799">
              Printing
            </a>
          </h3>
          <p>Fix your printer or a printer in a lab.</p>
          <h3>
            <a href="https://csumb.teamdynamix.com/TDClient/Requests/ServiceCatalog?CategoryID=5747">
              Telephones &amp; voicemail
            </a>
          </h3>
          <p>Manage your voicemail, get new phone numbers, and move phones.</p>
          <h3>
            <a href="https://csumb.teamdynamix.com/TDClient/Requests/ServiceCatalog?CategoryID=5598">
              Internet
            </a>
          </h3>
          <p>
            Log into the campus network, and fix issues with getting online.
          </p>
          <h3>
            <a href="https://csumb.teamdynamix.com/TDClient/Requests/ServiceCatalog">
              Full list of services
            </a>
          </h3>
          <p>Browse the complete list of services and submit a ticket.</p>
        </Container>
      </Layout>
    )
  }
}

export default ITPage

export const query = graphql`
  {
    allCsumbContentNavigation(filter: { site: { eq: "it" } }) {
      edges {
        node {
          navigation
        }
      }
    }
  }
`
