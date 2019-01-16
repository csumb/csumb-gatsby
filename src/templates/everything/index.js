import React from 'react'
import { Flex } from '@rebass/grid/emotion'
import { TopLevelBox } from 'components/pages/everything'
import Link from 'gatsby-link'
import SiteHeader from 'components/header/site-header'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { HeroParagraph } from 'components/type'

const EverythingTopLevelPage = ({ pageContext }) => (
  <Layout pageTitle="Everything else">
    {pageContext.is404 ? (
      <SiteHeader path="/everything">Page not found</SiteHeader>
    ) : (

        <SiteHeader path="/everything">Everything else</SiteHeader>
      )}
    <Container topPadding>
      {pageContext.is404 && (
        <HeroParagraph>
          We couldn't find that page, but here's a great way to find what you're looking for:
        </HeroParagraph>
      )}
      <Flex flexWrap="wrap">
        {pageContext.topLevelItems.map((item, key) => (
          <TopLevelBox key={item.contentful_id} width={[1, 1, 1 / 4]} px={2}>
            <h3>
              <Link to={`/everything/${item.slug}`}>{item.title}</Link>
            </h3>
            {item.childContentfulNavigationItemDescriptionTextNode && (
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    item.childContentfulNavigationItemDescriptionTextNode
                      .childMarkdownRemark.html,
                }}
              />
            )}
          </TopLevelBox>
        ))}
      </Flex>
    </Container>
  </Layout>
)

export default EverythingTopLevelPage
