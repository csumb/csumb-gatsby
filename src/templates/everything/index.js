import React from 'react'
import { Flex } from '../../components/common/grid'
import {
  TopLevelBox,
  EverythingContent,
} from '../../components/pages/everything'
import Link from 'gatsby-link'
import SiteHeader from '../../components/layouts/sections/header/site-header'
import { Layout } from '../../components/layouts/default'
import Container from '../../components/common/container'

const EverythingTopLevelPage = ({ pageContext }) => (
  <Layout pageTitle="Everything else">
    <SiteHeader path="/everything">Everything else</SiteHeader>
    <main>
      <Container topPadding>
        <Flex>
          {pageContext.topLevelItems.map(item => (
            <TopLevelBox key={item.contentful_id} width={[1, 1, 1 / 3]} px={2}>
              <h3>
                <Link to={`/everything/${item.slug}`}>{item.title}</Link>
              </h3>
              <EverythingContent item={item} />
            </TopLevelBox>
          ))}
        </Flex>
      </Container>
    </main>
  </Layout>
)

export default EverythingTopLevelPage
