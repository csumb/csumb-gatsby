import React from 'react'
import styled from 'styled-components'
import { colors } from 'components/styles/theme'
import { Flex, Box } from '@rebass/grid'
import Container from 'components/container'
import Link from 'gatsby-link'

const SiteFooterWrapper = styled('footer')`
  padding: 2rem 0;
  background: ${colors.primary.light};
  border-top: 3px solid ${colors.primary.darkest};
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

const SiteFooter = ({ site }) => (
  <SiteFooterWrapper>
    <Container>
      <h3>{site.title}</h3>
      <Flex flexWrap="wrap">
        <Box width={[1, 1 / 3, 1 / 3]} pr={[0, 2, 2]}>
          <SiteFooterItems>
            {site.contact.email && (
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                  </a>
                </dd>
              </div>
            )}
            {site.contact.phone && (
              <div>
                <dt>Phone</dt>
                <dd>{site.contact.phone}</dd>
              </div>
            )}
            {site.contact.phone && (
              <div>
                <dt>Fax</dt>
                <dd>{site.contact.fax}</dd>
              </div>
            )}
          </SiteFooterItems>
        </Box>
        <Box width={[1, 2 / 3, 2 / 3]}>
          <SiteFooterItems>
            {site.contact.building && (
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
            {site.contact.floor && (
              <div>
                <dt>Floor</dt>
                <dd>{site.contact.floor}</dd>
              </div>
            )}
            {site.contact.suite && (
              <div>
                <dt>Suite</dt>
                <dd>{site.contact.suite}</dd>
              </div>
            )}
            {site.contact.room && (
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

export default SiteFooter
