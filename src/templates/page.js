import React from 'react'
//import Link from 'gatsby'
import Blocks from './blocks'
import Layout from '../components/layouts/default'
import SiteNavigation from '../components/layouts/components/site-navigation'
import SiteHeader from '../components/layouts/components/site-header'
import Container from '../components/container'
import PageTitle from '../components/page-title'
import Breadcrumbs from '../components/breadcrumbs'
import { Flex, Box } from '@rebass/grid/emotion'

class PageTemplate extends React.Component {
  render() {
    return (
      <Layout pageTitle={this.props.pageContext.title}>
        <SiteHeader
          title={this.props.pageContext.site.title}
          path={this.props.pageContext.site.site}
        />
        <Container>
          <Breadcrumbs breadcrumbs={this.props.pageContext.breadcrumbs} />
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 5, 1 / 5]} px={2}>
              <SiteNavigation navigation={this.props.pageContext.navigation} />
            </Box>
            <Box width={[1, 1, 4 / 5, 4 / 5]} px={2}>
              <PageTitle layout={this.props.pageContext.layout}>
                {this.props.pageContext.title}
              </PageTitle>
              <Blocks blocks={this.props.pageContext.pageContent} />
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default PageTemplate
