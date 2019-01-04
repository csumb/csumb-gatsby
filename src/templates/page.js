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
import { Flex, Box } from '@rebass/grid/emotion'
import PageNavigation from 'components/navigation/page-navigation'
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
      pageNavigation,
      pageContent,
      feedbackEmail,
      pageUrl,
    } = this.props.pageContext

    const showNavigation = pageNavigation && pageNavigation.length

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
        {showNavigation ? (
          <Container>
            <Flex flexWrap="wrap">
              <Box width={[1, 3 / 12, 3 / 12]} px={2}>
                <PageNavigation navigation={pageNavigation} />
              </Box>
              <Box width={[1, 9 / 12, 9 / 12]} px={2}>
                <Blocks blocks={pageContent} />
              </Box>
            </Flex>
          </Container>
        ) : (
          <Blocks blocks={pageContent} />
        )}
        <PageFeedback email={feedbackEmail} title={title} url={pageUrl} />
      </Layout>
    )
  }
}

export default PageTemplate
