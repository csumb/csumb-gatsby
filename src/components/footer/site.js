import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import { Flex, Box } from '@rebass/grid/emotion'
import Container from 'components/container'
import Link from 'gatsby-link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faFlickr,
} from '@fortawesome/free-brands-svg-icons'
import VisuallyHidden from 'components/visually-hidden'

const SiteFooterWrapper = styled('footer')`
  padding: 2rem 0;
  background: ${colors.muted.highlight};
  border-top: 2px solid ${colors.muted.dark};
  margin-top: 1.5rem;
`

const SiteFooterItems = styled('dl')`
  dt,
  dd {
    display: inline;
  }
  dt {
    margin-right: 0.5rem;
  }
  div {
    margin-bottom: 0.5rem;
  }
`

const SiteFooterSocialIconLink = styled('a')`
  color: ${colors.muted.dark};
  font-size: 1.5rem;
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 1rem;
  &:visited {
    color: ${colors.muted.dark};
  }
`

const icons = {
  facebook: faFacebook,
  twitter: faTwitter,
  instagram: faInstagram,
  flickr: faFlickr,
  linkedin: faLinkedin,
  youtube: faYoutube,
}

const SiteFooterSocialIcon = ({ href, name }) => {
  if (!icons[name]) {
    return null
  }
  return (
    <SiteFooterSocialIconLink href={href}>
      <VisuallyHidden>{name}</VisuallyHidden>
      <FontAwesomeIcon icon={icons[name]} />
    </SiteFooterSocialIconLink>
  )
}

const SiteFooterSocial = ({ social }) => (
  <>
    {social.map((item, key) => (
      <SiteFooterSocialIcon name={item.site} href={item.url} key={key} />
    ))}
  </>
)

const SiteFooter = ({ site }) => {
  return (
    <SiteFooterWrapper>
      <Container>
        <h3>{site.title}</h3>
        {site.social && <SiteFooterSocial social={site.social} />}
        <Flex flexWrap="wrap">
          <Box width={[1, 1 / 3, 1 / 3]} pr={[0, 2, 2]}>
            <SiteFooterItems>
              {site.staffPage && (
                <div>
                  <dt>Staff</dt>
                  <dd>
                    <a href={site.staffPage}>View all staff</a>
                  </dd>
                </div>
              )}
              {site.contact && site.contact.email && (
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${site.contact.email}`}>
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
              )}
              {site.contact && site.contact.phone && (
                <div>
                  <dt>Phone</dt>
                  <dd>{site.contact.phone}</dd>
                </div>
              )}
              {site.contact && site.contact.fax && (
                <div>
                  <dt>Fax</dt>
                  <dd>{site.contact.fax}</dd>
                </div>
              )}
            </SiteFooterItems>
          </Box>
          <Box width={[1, 2 / 3, 2 / 3]}>
            <SiteFooterItems>
              {site.contact && site.contact.building && (
                <div>
                  <dt>Building</dt>
                  <dd>
                    <Link
                      to={`/building/${site.contact.building.code}`}
                      dangerouslySetInnerHTML={{
                        __html: site.contact.building.name,
                      }}
                    />
                  </dd>
                </div>
              )}
              {site.contact && site.contact.floor && (
                <div>
                  <dt>Floor</dt>
                  <dd>{site.contact.floor}</dd>
                </div>
              )}
              {site.contact && site.contact.suite && (
                <div>
                  <dt>Suite</dt>
                  <dd>{site.contact.suite}</dd>
                </div>
              )}
              {site.contact && site.contact.room && (
                <div>
                  <dt>Room</dt>
                  <dd>{site.contact.room}</dd>
                </div>
              )}
            </SiteFooterItems>
          </Box>
        </Flex>
      </Container>
    </SiteFooterWrapper>
  )
}

export default SiteFooter
