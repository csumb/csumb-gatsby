const { GraphQLString, GraphQLJSON } = require(`gatsby/graphql`)
const crypto = require(`crypto`)

exports.onCreateNode = async ({ node, loadNodeContent, actions, createNodeId }) => {
  const { createNode, createParentChildLink } = actions
  if (node.extension !== `json` || node.sourceInstanceName !== 'web-content') {
    return
  }
  let content = await loadNodeContent(node)
  content = JSON.parse(content)

  let contentNode = false
  if(typeof content.pageContent !== 'undefined') {
    contentNode = {
      id: createNodeId(`${node.id} >>> CsumbContentPage`),
      children: [],
      parent: node.id,
      title: content.title,
      layout: content.layout,
      site: content.site,
      pageContent: JSON.stringify(content.pageContent),
      internal: {
        type: `CsumbContentPage`,
      },
    }
  }

  if(node.relativePath.search('_site.json') > -1) {
    contentNode = {
      id: createNodeId(`${node.id} >>> CsumbContentSite`),
      children: [],
      parent: null,
      site: content.site,
      title: content.title,
      internal: {
        type: `CsumbContentSite`,
      },
    }
  }

  if(node.relativePath.search('_navigation.json') > -1) {
    contentNode = {
      id: createNodeId(`${node.id} >>> CsumbContentNavigation`),
      children: [],
      parent: null,
      site: content.site,
      navigation: JSON.stringify(content.navigation),
      internal: {
        type: `CsumbContentNavigation`,
      },
    }
  }

  if(!contentNode) {
    return
  }

  contentNode.internal.contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(contentNode))
      .digest(`hex`)

    createNode(contentNode)
    if(contentNode.parent) {
      createParentChildLink({ parent: node, child: contentNode })
    }
}