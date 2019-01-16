import React from 'react'
import { Flex } from '@rebass/grid/emotion'
import { TopLevelBox, EverythingContent } from 'components/pages/everything'
import Link from 'gatsby-link'
import SiteHeader from 'components/header/site-header'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { LeadParagraph } from 'components/type'
import BreakpointContext from 'components/contexts/breakpoint'

const EverythingTopLevelPage = ({ pageContext }) => (
  <Layout pageTitle="Everything else">
    <BreakpointContext.Consumer>
      {breakpoint => (
        <>
          {pageContext.is404 ? (
            <SiteHeader path="/everything">Page not found</SiteHeader>
          ) : (
            <SiteHeader path="/everything">Everything else</SiteHeader>
          )}
          <Container topPadding>
            {pageContext.is404 && (
              <LeadParagraph>
                We couldn't find that page, but here's a great way to find what
                you're looking for:
              </LeadParagraph>
            )}
            <Flex flexWrap="wrap">
              {pageContext.topLevelItems.map(item => (
                <TopLevelBox
                  key={item.contentful_id}
                  width={[1, 1, 1 / 3]}
                  px={2}
                >
                  <h3>
                    <Link to={`/everything/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <EverythingContent item={item} />
                </TopLevelBox>
              ))}
            </Flex>
          </Container>
        </>
      )}
    </BreakpointContext.Consumer>
  </Layout>
)

export default EverythingTopLevelPage
