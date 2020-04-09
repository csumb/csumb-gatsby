const crypto = require('crypto')
const request = require('sync-request')
const fetch = require('node-fetch')
const asyncPool = require('tiny-async-pool')
const moment = require('moment')

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
          if (date.end_stamp + 86400 >= today.getTime() / 1000) {
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

  const pageLinks = request('GET', `${endpoint}&type=page_links`)
  const links = JSON.parse(pageLinks.getBody())

  await asyncPool(3, links.links, link => {
    return new Promise((resolve, reject) => {
      fetch(link)
        .then(response => {
          return response.json()
        })
        .then(pages => {
          if (pages) {
            pages.pages.forEach(item => {
              pageNode(item)
            })
          }
          resolve()
        })
    })
  }).then(() => {
    fetchActivity.end()
  })
}
