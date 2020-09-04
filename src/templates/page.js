import React from 'react'
import Blocks from './blocks'
import { Layout } from '../components/layouts/default'
import {
  SiteNavigation,
  PageNavigation,
} from '../components/layouts/sections/navigation'
import SiteHeader from '../components/layouts/sections/header/site-header'
import Container from '../components/common/container'
import PageTitle from '../components/layouts/sections/header/page-title'
import { EventPage } from '../components/events'
import { Flex, Box } from '../components/common/grid'
import Breadcrumbs from '../components/layouts/sections/header/breadcrumbs'
import BlockHero from './blocks/blocks/hero-image'
import SiteFooter from '../components/layouts/sections/footer/site'
import PageEditorTools from '../components/user-tools/editors'
import CatalogIndicator from '../components/pages/catalog-indicator'
import Olark from '../components/utilities/olark'
import Serenova from '../components/utilities/serenova'
import PageFeedbackContext from '../components/contexts/page-feedback'

const PageTemplate = ({ pageContext }) => {
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
    topHero,
    drupalNid,
    embedTargetSite,
    olarkSite,
    serenovaId,
    serenovaGreeting,
    serenovaConfirmation,
  } = pageContext

  console.log(pageContext)
  const serenovaProps = {
    siteId: serenovaId,
    greetingText: serenovaGreeting,
    confirmationText: serenovaConfirmation,
  }

  const showNavigation = pageNavigation && pageNavigation.length
  const showCatalogIndicator = embedTargetSite && embedTargetSite === 'catalog'

  return (
    <PageFeedbackContext.Provider
      value={{ email: feedbackEmail, title: title, url: pageUrl }}
    >
      <Layout
        pageTitle={title}
        siteNavigation={navigation}
        siteTitle={site.title}
        isSiteHomepage={layout === 'site'}
        noFooterMargin={site.contact || site.staffPage ? true : false}
      >
        {olarkSite && <Olark siteId={olarkSite} />}
        {serenovaId && <Serenova {...serenovaProps} />}
        <SiteHeader path={site.site}>{site.title}</SiteHeader>
        <SiteNavigation navigation={navigation} />
        <main>
          {topHero && <BlockHero {...topHero} />}
          <Container>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <PageEditorTools site={site} pageId={drupalNid} />
            {layout !== 'site' && (
              <PageTitle layout={layout}>{title}</PageTitle>
            )}
            {showCatalogIndicator && <CatalogIndicator />}
          </Container>
          {event && <EventPage event={event} />}

          {showNavigation ? (
            <Container>
              <Flex>
                <Box width={[1, 3 / 12]} pr={[0, 8]} order={[2, 1]}>
                  <PageNavigation navigation={pageNavigation} />
                </Box>
                <Box width={[1, 9 / 12]} order={[1, 2]}>
                  <Blocks blocks={pageContent} />
                </Box>
              </Flex>
            </Container>
          ) : (
            <Blocks blocks={pageContent} />
          )}

          {((site.contact && (site.contact.phone || site.contact.email)) ||
            (site.social && site.social.length) ||
            site.staffPage) && <SiteFooter site={site} />}
        </main>
      </Layout>
    </PageFeedbackContext.Provider>
  )
}

export default PageTemplate
