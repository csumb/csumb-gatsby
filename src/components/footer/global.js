import React from 'react'
import Link from 'gatsby-link'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import logo from 'assets/images/csumb-logo-white.svg'
import styled from '@emotion/styled'
import { colors } from 'components/styles/theme'
import bp from 'components/styles/breakpoints'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import VisuallyHidden from 'components/visually-hidden';

const FooterSocialIconLink = styled('a')`
  color: ${colors.white};
  text-decoration: none;
  display: inline-block;
  margin-right: 2rem;
  font-size: 1.5rem;
`

const SocialIconWrapper = styled('div')`
  margin: 1rem 0;
`

const FooterElement = styled('footer')`
  background: ${colors.primary.darkest};
  ${props => props.hasSiteFooter ? `` : `margin-top: 1rem;`}
  padding: 1rem 0;
  color: ${colors.white};
  font-size: 0.9rem;
  ul {
    list-style-type: none;
    padding: 0;
  }
  a,
  a:visited {
    color: ${colors.white};
  }
  h2 {
    margin-top: 0;
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
})};
`

const LegalLink = styled(Link)`
  color: ${colors.white};
  padding-top: 1rem;
  font-size: 0.8rem;
`

const FooterSocialIcon = ({ href, name, icon }) => (
  <FooterSocialIconLink href={href}>
    <VisuallyHidden>{name}</VisuallyHidden>
    <FontAwesomeIcon icon={icon} />
  </FooterSocialIconLink>
)

class Footer extends React.Component {
  render() {
    return (
      <FooterElement hasSiteFooter={this.props.hasSiteFooter}>
        <Container>
          <Flex flexWrap="wrap">
            <Box width={[1, 7 / 12]} pr={2}>
              <Flex flexWrap="wrap">
                <Box width={[1, 1 / 3]}>
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
                <Box width={[1, 1 / 3]}>
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
                <Box width={[1, 1 / 3]}>
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
              </Flex>
              <SocialIconWrapper>
                <FooterSocialIcon name="twitter" href="https://twitter.com/csumb" icon={faTwitter} />
                <FooterSocialIcon name="facebook" href="https://facebook.com/csumb" icon={faFacebook} />
                <FooterSocialIcon name="instagram" href="https://instagram.com/csumb" icon={faInstagram} />
                <FooterSocialIcon name="linkedin" href="http://linkedin.com/company/csu-monterey-bay" icon={faLinkedin} />
              </SocialIconWrapper>
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
              <LegalLink to="/clery">Security report</LegalLink> |{' '}
              <LegalLink to="/legal">Legal information</LegalLink>
            </RightFooter>
          </Flex>
        </Container>
      </FooterElement>
    )
  }
}

export default Footer
