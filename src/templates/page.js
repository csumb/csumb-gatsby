import React from 'react'
//import Link from 'gatsby'
import Blocks from './blocks'
import PageFeedback from 'components/page-feedback'
import Layout from 'components/layouts/default'
import SiteNavigation from 'components/site-navigation'
import SiteHeader from 'components/site-header'
import Container from 'components/container'
import PageTitle from 'components/page-title'
import { EventPage } from 'components/event'
import Breadcrumbs from 'components/breadcrumbs'

class PageTemplate extends React.Component {
  render() {
    const {
      title,
      site,
      navigation,
      breadcrumbs,
      layout,
      event,
      pageContent,
      feedbackEmail,
      pageUrl
    } = this.props.pageContext


    return (
      <Layout
        pageTitle={title}
        siteNavigation={navigation}
        siteTitle={site.title}
      >
        <SiteHeader path={site.site}>{site.title}</SiteHeader>
        <SiteNavigation navigation={navigation} />
        <Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          {layout !== 'site' && <PageTitle layout={layout}>{title}</PageTitle>}
        </Container>
        {event && <EventPage event={event} />}
        <Blocks blocks={pageContent} />
        <PageFeedback email={feedbackEmail} title={title} url={pageUrl} />
      </Layout>
    )
  }
}

export default PageTemplate
