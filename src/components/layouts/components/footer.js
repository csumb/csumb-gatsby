import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import Link from 'gatsby-link'
import { ButtonLink } from 'components/button'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import logo from 'assets/images/csumb-logo-blue.svg'
import styled from 'react-emotion'
import { colors } from 'components/styles/theme'

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

const FooterHeader = styled('h3')`
  margin-bottom: 0.5rem;
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

const Footer = ({ children, data }) => (
  <FooterElement>
    <Container>
      <Flex flexWrap="wrap">
        <Box width={[1, 1 / 4]}>
          <FooterHeader>Popular</FooterHeader>
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
            <li>
              <Link to="/social" title="">
                Social media
              </Link>
            </li>
            <li>
              <Link to="/library" title="">
                Library
              </Link>
            </li>
          </FooterList>
        </Box>
        <Box width={[1, 1 / 4]}>
          <FooterHeader>Tools</FooterHeader>
          <FooterList>
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
        <Box width={[1, 1 / 4]}>
          <FooterHeader>Links for</FooterHeader>
          <FooterList>
            <li>
              <Link to="/families" title="">
                Parents
              </Link>
            </li>
            <li>
              <Link to="/international" title="">
                International students
              </Link>
            </li>
            <li>
              <Link to="/locals" title="">
                Locals
              </Link>
            </li>
            <li>
              <Link to="/veterans" title="">
                Veterans
              </Link>
            </li>
            <li>
              <Link to="/employees" title="">
                Employees
              </Link>
            </li>
          </FooterList>
        </Box>
        <Box width={[1, 1 / 4]}>
          <img src={logo} alt="Cal State Monterey Bay" />
          <div>
            <ButtonLink to="/giving" buttonType="primary">
              Give
            </ButtonLink>
          </div>
        </Box>
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
