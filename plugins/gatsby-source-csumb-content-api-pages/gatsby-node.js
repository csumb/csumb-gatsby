const crypto = require('crypto')
const request = require('sync-request')

const today = new Date()

exports.sourceNodes = async (
  { actions, createNodeId, reporter },
  configOptions
) => {
  const { createNode } = actions
  const { endpoint } = configOptions

  const pageNode = content => {
    if (!content) {
      return
    }
    const digest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(content))
      .digest(`hex`)
    let topHero = {}
    if (
      content.pageContent.layout.length > 0 &&
      content.pageContent.blocks &&
      typeof content.pageContent.blocks[content.pageContent.layout[0].id] !==
        'undefined' &&
      content.pageContent.blocks[content.pageContent.layout[0].id] &&
      content.pageContent.blocks[content.pageContent.layout[0].id].type ===
        'heroimage'
    ) {
      topHero =
        content.pageContent.blocks[content.pageContent.layout[0].id].data
      content.pageContent.layout.splice(0, 1)
    }
    const breadcrumbs =
      typeof content.breadcrumb !== 'undefined'
        ? JSON.stringify(content.breadcrumb)
        : false
    const pagePath =
      content.site === content.path && content.layout === 'site'
        ? content.site
        : `${content.site}/${content.path}`
    const contentNode = {
      id: createNodeId(`${content.uuid} >>> CsumbPage`),
      children: [],
      parent: null,
      title: content.title,
      layout: content.layout,
      site: content.site,
      drupalNid: content.drupalNid,
      pagePath: pagePath,
      topHero: topHero,
      breadcrumbs: breadcrumbs,
      navigation: content.navigation ? content.navigation : [],
      feedbackEmail: content.feedback_email ? content.feedback_email : '',
      pageContent: JSON.stringify(content.pageContent),
      embedTargetSite:
        typeof content.embed_target_site !== 'undefined'
          ? content.embed_target_site
          : '',
      internal: {
        type: `CsumbPage`,
        contentDigest: digest,
      },
    }

    if (content.event) {
      content.event._passedEvent = true
      content.event._sortDate = 0
      if (typeof content.event.date_stamps !== 'undefined') {
        content.event.date_stamps.forEach(date => {
          if (date.start_stamp >= today.getTime() / 1000) {
            content.event._passedEvent = false
            content.event._sortDate = date.start_stamp
          }
        })
      }
      contentNode.event = content.event
    }
    createNode(contentNode)
  }

  fetchActivity = reporter.activityTimer(
    'Downloading pages & events from CSUMB editor'
  )
  fetchActivity.start()

  const pageCountResponse = request('GET', `${endpoint}&type=pages_count`)
  const pagesCount = JSON.parse(pageCountResponse.getBody())

  let nextUrl = `${endpoint}&type=pages`
  let currentPage = 0
  while (nextUrl) {
    const response = request('GET', nextUrl)
    const pages = JSON.parse(response.getBody())
    if (pages) {
      pages.pages.forEach(item => {
        pageNode(item)
      })
      currentPage++
      reporter.info(`Content page ${currentPage}/${pagesCount.count}`)
      nextUrl = pages.next
    } else {
      nextUrl = false
    }
  }

  fetchActivity.end()
}
