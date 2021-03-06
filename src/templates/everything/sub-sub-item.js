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
  EverythingContent,
} from '../../components/pages/everything'
import SiteHeader from '../../components/layouts/sections/header/site-header'
import { Layout } from '../../components/layouts/default'
import Container from '../../components/common/container'
import { Flex, Box } from '../../components/common/grid'
import Link from 'gatsby-link'
import BreakpointContext from '../../components/contexts/breakpoint'

const EverythingSubLevelPage = ({ pageContext }) => (
  <BreakpointContext.Consumer>
    {({ isMobile }) => (
      <Layout pageTitle="Everything else">
        <SiteHeader path="/everything">Everything else</SiteHeader>
        <main>
          <Container topPadding>
            <Flex>
              {isMobile ? (
                <p>
                  <Link to={`/everything/${pageContext.topLevelItem.slug}`}>
                    ← Back to {pageContext.topLevelItem.title}
                  </Link>
                </p>
              ) : (
                <>
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
                    <SecondLevelTitle>
                      {pageContext.topLevelItem.title}
                    </SecondLevelTitle>
                    <EverythingContent item={pageContext.topLevelItem} />
                    <SecondLevelList>
                      {pageContext.secondLevelItems.map(item => (
                        <SubItem key={item.contentful_id}>
                          {!item.link && <SubItemArrow />}
                          <HiddenLink
                            to={
                              item.link
                                ? item.link
                                : `/everything/${
                                    pageContext.topLevelItem.slug
                                  }/${item.slug}`
                            }
                          >
                            <SubItemContent item={item} />
                          </HiddenLink>
                        </SubItem>
                      ))}
                    </SecondLevelList>
                  </Box>
                </>
              )}
              <Box width={[1, 2 / 5]} px={2}>
                <ThirdLevelTitle>
                  {pageContext.currentItem.title}
                </ThirdLevelTitle>
                <EverythingContent item={pageContext.currentItem} />
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
        </main>
      </Layout>
    )}
  </BreakpointContext.Consumer>
)

export default EverythingSubLevelPage
