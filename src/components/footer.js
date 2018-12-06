import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import Link from 'gatsby-link'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import logo from 'assets/images/csumb-logo-blue.svg'
import styled from 'react-emotion'
import { colors } from 'components/styles/theme'
import bp from 'components/styles/breakpoints'

const FooterElement = styled('footer')`
  border-top: 3px solid ${colors.primary.darkest};
  margin-top: 1rem;
  padding-top: 1rem;
  ul {
    list-style-type: none;
    padding: 0;
  }
  h2 {
    margin-top: 0;
  }
`

const Legal = styled('div')`
  background-color: ${colors.primary.darkest};
  padding: 0.5rem 0;
  text-align: right;
  a,
  a:visited {
    color: ${colors.white};
    font-size: 0.8rem;
    margin-right: 1rem;
    &:last-child {
      margin-right: 0;
    }
  }
`

const FooterList = styled('ul')`
  margin: 0;
  li {
    margin-bottom: 0.5rem;
  }
`

const FooterAddressList = styled('ul')`
  margin: 0;
  list-style-type: none;
`

const FooterAddressListItem = styled('li')`
  margin-bottom: 0;
`

const Logo = styled('img')`
  margin-bottom: 0.5rem;
  max-width: 250px;
`

const RightFooter = styled(Box)`
  ${bp({
    textAlign: ['normal', 'right'],
  })}
`

const Footer = ({ children, data }) => (
  <FooterElement>
    <Container>
      <Flex flexWrap="wrap">
        <Box width={[1, 2 / 12]}>
          <FooterList>
            <li>
              <Link to="/jobs" title="">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/admissions/visit" title="">
                Tours
              </Link>
            </li>
            <li>
              <Link to="/academics" title="">
                Majors
              </Link>
            </li>
          </FooterList>
        </Box>
        <Box width={[1, 2 / 12]}>
          <FooterList>
            <li>
              <Link to="/library" title="">
                Library
              </Link>
            </li>
            <li>
              <Link to="/map" title="">
                Map
              </Link>
            </li>
            <li>
              <Link to="/mastercalendar" title="">
                Calendar
              </Link>
            </li>
          </FooterList>
        </Box>
        <Box width={[1, 3 / 12]}>
          <FooterList>
            <li>
              <Link to="/directory" title="">
                Directory
              </Link>
            </li>
            <li>
              <Link to="/catalog" title="">
                Catalog
              </Link>
            </li>
            <li>
              <Link to="/planning/schedule" title="">
                Class schedule
              </Link>
            </li>
          </FooterList>
        </Box>
        <RightFooter width={[1, 5 / 12]}>
          <Logo src={logo} alt="Cal State Monterey Bay" />
          <FooterAddressList>
            <FooterAddressListItem>
              <strong>Call:</strong> 831-582-3000
            </FooterAddressListItem>
            <FooterAddressListItem>
              <strong>Visit:</strong> 5108 Fourth Avenue, Marina, CA 93933
            </FooterAddressListItem>
            <FooterAddressListItem>
              <strong>Mail:</strong> 100 Campus Center, Seaside, CA 93955
            </FooterAddressListItem>
          </FooterAddressList>
        </RightFooter>
      </Flex>
    </Container>
    <Legal>
      <Container>
        <Link to="/copyright">Website Copyright/DMCA Policy</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/accessibility">Accessibility</Link>
        <Link to="https:/cm.maxient.com/reportingform.php?CSUMontereyBay&amp;layout_id=0">
          Report concerning behavior
        </Link>
        <Link to="/titleix">
          Title <abbr title="nine">IX</abbr>
        </Link>
        <Link to="/diversity">Diversity &amp; Inclusion</Link>
        <Link to="/clery">Security report</Link>
        <Link to="/hr/form-801">Form 801</Link>
      </Container>

      <VisuallyHidden>
        <Link to="/document-reader">
          Some links for may require a Document Reader.
        </Link>
      </VisuallyHidden>
    </Legal>
  </FooterElement>
)

export default Footer
