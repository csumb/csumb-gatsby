import React from 'react'
//import Link from 'gatsby'
import Blocks from './blocks'
import Layout from 'components/layouts/default'
import SiteNavigation from 'components/layouts/components/site-navigation'
import SiteHeader from 'components/layouts/components/site-header'
import Container from 'components/container'
import PageTitle from 'components/page-title'
import Breadcrumbs from 'components/breadcrumbs'

class PageTemplate extends React.Component {
  render() {
    const {
      title,
      site,
      navigation,
      breadcrumbs,
      layout,
      pageContent,
    } = this.props.pageContext

    return (
      <Layout pageTitle={title}>
        <SiteHeader path={site.site}>{site.title}</SiteHeader>
        <SiteNavigation navigation={navigation} />
        <Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          {layout !== 'site' && <PageTitle layout={layout}>{title}</PageTitle>}
        </Container>
        <Blocks blocks={pageContent} />
      </Layout>
    )
  }
}

export default PageTemplate
