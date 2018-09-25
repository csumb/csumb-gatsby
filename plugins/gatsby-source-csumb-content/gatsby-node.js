const fs = require('fs')
const crypto = require('crypto')
const walk = require('walk')
const _ = require('lodash')

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
    var path = `${root}/${fileStats.name}`
    fs.readFile(path, 'utf8', function(err, data) {
      const digest = crypto.createHash(`md5`)
        .update(data)
        .digest(`hex`)
      const content = JSON.parse(data)
      const nodeData = {
        id: createNodeId(path),
        parent: null,
        children: [],
        title: content.title,
        site: content.site,
        relativePath: path.replace('.json', '').replace(configOptions.path, ''),
        content: data,
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
        content: content,
        site: content.site,
        relativePath: path,
        content: data,
        internal: {
          type: _.camelCase(`csumb content ${type}`),
          contentDigest: digest
        }
      }
    
      createNode(nodeData)
      next()
    });
  });
}