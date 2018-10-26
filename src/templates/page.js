import React from 'react'
//import Link from 'gatsby'
import Blocks from './blocks'
import Layout from '../components/layouts/default'
import SiteNavigation from '../components/layouts/components/site-navigation'
import SiteHeader from '../components/layouts/components/site-header'
import Container from '../components/container'
import PageTitle from '../components/page-title'
import Breadcrumbs from '../components/breadcrumbs'

class PageTemplate extends React.Component {
  render() {
    return (
      <Layout pageTitle={this.props.pageContext.title}>
        <SiteHeader
          title={this.props.pageContext.site.title}
          path={this.props.pageContext.site.site}
        />
        <SiteNavigation navigation={this.props.pageContext.navigation} />
        <Container>
          <Breadcrumbs breadcrumbs={this.props.pageContext.breadcrumbs} />
          <PageTitle layout={this.props.pageContext.layout}>
            {this.props.pageContext.title}
          </PageTitle>
        </Container>
        <Blocks blocks={this.props.pageContext.pageContent} />
      </Layout>
    )
  }
}

export default PageTemplate
