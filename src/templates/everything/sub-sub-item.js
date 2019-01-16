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
  ThirdLevelList,
  ThirdLevelTitle,
} from 'components/pages/everything'
import SiteHeader from 'components/header/site-header'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'

const EverythingSubLevelPage = ({ pageContext }) => (
  <Layout pageTitle="Everything else">
    <SiteHeader path="/everything">Everything else</SiteHeader>
    <Container topPadding>
      <Flex flexWrap="wrap">
        <Box width={[1, 1 / 5]} px={2}>
          <TopLevelList>
            {pageContext.topLevelItems.map(item => (
              <TopLevelItem key={item.contentful_id}>
                <TopLevelItemLink to={`/everything/${item.slug}`}>
                  {item.title}
                </TopLevelItemLink>
              </TopLevelItem>
            ))}
          </TopLevelList>
        </Box>
        <Box width={[1, 2 / 5]} px={2}>
          <SecondLevelTitle>{pageContext.topLevelItem.title}</SecondLevelTitle>
          <SecondLevelList>
            {pageContext.secondLevelItems.map(item => (
              <SubItem key={item.contentful_id}>
                {!item.link && (
                  <SubItemArrow />
                )}
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
        <Box width={[1, 2 / 5]} px={2}>
          <ThirdLevelTitle>{pageContext.currentItem.title}</ThirdLevelTitle>
          <ThirdLevelList>
            {pageContext.currentItems.map(item => (
              <SubItem key={item.contentful_id}>
                <HiddenLink to={item.link}>
                  <SubItemContent item={item} />
                </HiddenLink>
              </SubItem>
            ))}
          </ThirdLevelList>
        </Box>
      </Flex>
    </Container>
  </Layout>
)

export default EverythingSubLevelPage
