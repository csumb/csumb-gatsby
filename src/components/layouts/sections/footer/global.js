import React, { Component } from 'react'
import LinkInspect from '../../../utilities/link-inspect'
import Container from '../../../common/container'
import { Flex, Box } from '../../../common/grid'
import styled from '@emotion/styled'
import { colors, bp } from '../../../../style'
import PageFeedbackContext from '../../../contexts/page-feedback'
import PageFeedbackForm from '../../../user-tools/page-feedback'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DialogOverlay, DialogContent } from '../../../common/dialog'
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import VisuallyHidden from '../../../utilities/visually-hidden'

const FeedbackDialogContent = styled(DialogContent)`
  width: 75%;
`

const FooterGiftButton = styled('a')`
  color: ${colors.white};
  border: 2px solid white;
  display: inline-block;
  padding: 0.5rem;
  margin: 1rem 0;
  text-decoration: none;
`

const FooterSocialIconLink = styled('a')`
  color: ${colors.white};
  text-decoration: none;
  display: inline-block;
  margin-right: 2rem;
  max-width: 1rem;
  ${bp({
    fontSize: ['1.2rem', '1.5rem', '1.5rem'],
  })};
`

const SocialIconWrapper = styled('div')`
  margin: 1rem 0;
`

const FooterElement = styled('footer')`
  background: ${colors.primary.darkest};
  ${props => (props.noFooterMargin ? `` : `margin-top: 1rem;`)}
  padding: 1rem 0;
  color: ${colors.white};
  font-size: 0.9rem;
  clear: both;
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

  @media print {
    display: none;
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

const RightFooter = styled(Box)`
  ${bp({
    textAlign: ['normal', 'right'],
  })};
`

const LegalLink = styled(LinkInspect)`
  color: ${colors.white};
  padding-top: 1rem;
  font-size: 0.8rem;
`

const LegalButtonLink = styled('button')`
  color: ${colors.white};
  font-size: 0.8rem;
  text-decoration: underline;
  margin: 0;
  border: 0;
  background: transparent;
  padding: 1rem 0 0 0;
  cursor: pointer;
`

const LegalWrapper = styled('div')`
  text-align: right;
`

const FooterSocialIcon = ({ href, name, icon }) => (
  <FooterSocialIconLink href={href}>
    <VisuallyHidden>{name}</VisuallyHidden>
    <FontAwesomeIcon icon={icon} />
  </FooterSocialIconLink>
)

class Footer extends Component {
  render() {
    return (
      <FooterElement
        noFooterMargin={this.props.noFooterMargin}
        data-swiftype-index="false"
      >
        <Container>
          <Flex>
            <Box width={[1, 7 / 12]} pr={2}>
              <Flex>
                <Box width={[1, 1 / 3]}>
                  <FooterList>
                    <li>
                      <a href="/jobs">Jobs</a>
                    </li>
                    <li>
                      <a href="/admissions/visit">Tours</a>
                    </li>
                    <li>
                      <a href="/parking">Parking</a>
                    </li>
                  </FooterList>
                </Box>
                <Box width={[1, 1 / 3]}>
                  <FooterList>
                    <li>
                      <a href="/library">Library</a>
                    </li>
                    <li>
                      <a href="/map">Map</a>
                    </li>
                    <li>
                      <a href="/mastercalendar">Calendar</a>
                    </li>
                  </FooterList>
                </Box>
                <Box width={[1, 1 / 3]}>
                  <FooterList>
                    <li>
                      <a href="/directory">Directory</a>
                    </li>
                    <li>
                      <a href="/catalog">Catalog</a>
                    </li>
                    <li>
                      <a href="/schedule">Class schedule</a>
                    </li>
                  </FooterList>
                </Box>
              </Flex>
              <SocialIconWrapper>
                <FooterSocialIcon
                  name="twitter"
                  href="https://twitter.com/csumb"
                  icon={faTwitter}
                />
                <FooterSocialIcon
                  name="facebook"
                  href="https://facebook.com/csumb"
                  icon={faFacebook}
                />
                <FooterSocialIcon
                  name="instagram"
                  href="https://instagram.com/csumb"
                  icon={faInstagram}
                />
                <FooterSocialIcon
                  name="linkedin"
                  href="http://linkedin.com/company/csu-monterey-bay"
                  icon={faLinkedin}
                />
                <FooterSocialIcon
                  name="youtube"
                  href="http://youtube.com/csumb"
                  icon={faYoutube}
                />
              </SocialIconWrapper>
            </Box>

            <RightFooter width={[1, 5 / 12]}>
              <h4>California State University, Monterey Bay</h4>
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
              <div>
                <FooterGiftButton href="https://donate.csumb.edu">
                  Make a gift
                </FooterGiftButton>
              </div>
            </RightFooter>
          </Flex>
          <LegalWrapper>
            <PageFeedbackContext.Consumer>
              {context => (
                <>
                  {context && context.email && (
                    <FooterPageFeedback {...context} />
                  )}
                </>
              )}
            </PageFeedbackContext.Consumer>
            <LegalLink to="https://cm.maxient.com/reportingform.php?CSUMontereyBay&layout_id=0">
              Report concerning behavior
            </LegalLink>{' '}
            | <LegalLink to="/clery">Security report</LegalLink> |{' '}
            <LegalLink to="/legal">Legal information</LegalLink>
            <VisuallyHidden>
              <LinkInspect to="/document-readers">
                Some links may require a Document Reader
              </LinkInspect>
            </VisuallyHidden>
          </LegalWrapper>
        </Container>
      </FooterElement>
    )
  }
}

class FooterPageFeedback extends Component {
  state = {
    isOpen: false,
  }

  render() {
    const { isOpen } = this.state
    return (
      <>
        <DialogOverlay
          style={{ background: 'rgba(0, 0, 0, 0.7)' }}
          isOpen={isOpen}
        >
          <FeedbackDialogContent>
            <PageFeedbackForm
              {...this.props}
              closeAction={event => {
                event.preventDefault()
                this.setState({
                  isOpen: false,
                })
              }}
            />
          </FeedbackDialogContent>
        </DialogOverlay>
        <LegalButtonLink
          onClick={event => {
            event.preventDefault()
            this.setState({
              isOpen: !isOpen,
            })
          }}
        >
          Report website issue
        </LegalButtonLink>{' '}
        |{' '}
      </>
    )
  }
}

export default Footer
