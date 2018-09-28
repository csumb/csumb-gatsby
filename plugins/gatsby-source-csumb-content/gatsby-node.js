const fs = require('fs')
const crypto = require('crypto')
const walk = require('walk')
const _ = require('lodash')
const report = require('gatsby-cli/lib/reporter')

exports.sourceNodes = async ({ actions , createNodeId }, configOptions) => {
  const { createNode } = actions
  const pageWalker = walk.walk(configOptions.path, {
    filters: ['.git', '_data']
  });
  
  pageWalker.on('file', function(root, fileStats, next) {
    if(fileStats.name.search('.json') === -1) {
      next()
      return
    }
    let path = `${root}/${fileStats.name}`
    fs.readFile(path, 'utf8', function(err, data) {
      let digest = crypto.createHash(`md5`)
        .update(data)
        .digest(`hex`)
      let content = JSON.parse(data)
      
      path = path.replace('.json', '').replace(configOptions.path, '')
      path = path.split('/')
      if(path[path.length - 1] == 'index') {
        path.pop()
      }
      
      let nodeData = {
        id: createNodeId(path),
        uuid: content.uuid,
        parent: null,
        children: [],
        title: content.title,
        site: content.site,
        pageContent: JSON.stringify(content.pageContent),
        relativePath: path.join('/'),
        internal: {
          type: `CsumbContentPage`,
          contentDigest: digest
        }
      }
      createNode(nodeData)
      next()
    });
  });
  
  const siteWalker = walk.walk(configOptions.path, {
    filters: ['.git']
  });
  
  siteWalker.on('file', function(root, fileStats, next) {
    if(root.search('_data') === -1) {
      next()
      return
    }
    const type = fileStats.name.replace('_', '').replace('.json', '')
    const path = `${root}/${fileStats.name}`
    fs.readFile(path, 'utf8', function(err, data) {
      const digest = crypto.createHash(`md5`)
        .update(data)
        .digest(`hex`)
        
      const content = JSON.parse(data)
      const nodeData = {
        id: createNodeId(path),
        parent: null,
        children: [],
        site: content.site,
        relativePath: path,
        internal: {
          type: _.camelCase(`csumb content ${type}`),
          contentDigest: digest
        }
      }
      if(type == 'site') {
        nodeData.title = content.title
      }
      if(type == 'navigation') {
        nodeData.navigation = JSON.stringify(content.navigation)
      }
    
      createNode(nodeData)
      next()
    });
  });
}