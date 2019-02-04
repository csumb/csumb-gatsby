import React from 'react'
import {
  TopLevelList,
  TopLevelItem,
  TopLevelItemLink,
  SecondLevelList,
  SecondLevelTitle,
  SubItem,
  SubItemArrow,
  SubItemContent,
  HiddenLink,
  EverythingContent,
} from 'components/pages/everything'
import SiteHeader from 'components/header/site-header'
import Link from 'gatsby-link'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid'
import MediaQuery from 'react-responsive'

const EverythingSubLevelPage = ({ pageContext }) => (
  <Layout pageTitle="Everything else">
    <SiteHeader path="/everything">Everything else</SiteHeader>
    <Container topPadding>
      <Flex flexWrap="wrap">
        <MediaQuery query="(max-width: 830px)">
          <p>
            <Link to="/everything">← Back to everything</Link>
          </p>
        </MediaQuery>
        <MediaQuery query="(min-width: 830px)">
          <Box width={[1, 1 / 5]} px={2}>
            <TopLevelList>
              {pageContext.topLevelItems.map(item => (
                <TopLevelItem key={item.contentful_id}>
                  <TopLevelItemLink
                    to={`/everything/${item.slug}`}
                    isActive={
                      item.contentful_id ===
                      pageContext.currentItem.contentful_id
                    }
                  >
                    {item.title}
                  </TopLevelItemLink>
                </TopLevelItem>
              ))}
            </TopLevelList>
          </Box>
        </MediaQuery>
        <Box width={[1, 2 / 5]} px={2}>
          <SecondLevelTitle>{pageContext.currentItem.title}</SecondLevelTitle>
          <EverythingContent item={pageContext.currentItem} />
          <SecondLevelList>
            {pageContext.currentItems.map(item => (
              <SubItem key={item.contentful_id}>
                {!item.link && <SubItemArrow />}
                <HiddenLink
                  to={
                    item.link
                      ? item.link
                      : `/everything/${pageContext.currentItem.slug}/${
                          item.slug
                        }`
                  }
                >
                  <SubItemContent item={item} />
                </HiddenLink>
              </SubItem>
            ))}
          </SecondLevelList>
        </Box>
      </Flex>
    </Container>
  </Layout>
)

export default EverythingSubLevelPage
