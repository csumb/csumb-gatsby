const fetch = require(`node-fetch`)
const crypto = require(`crypto`)

exports.sourceNodes = async ({ actions , createNodeId }, configOptions) => {
  const { createNode } = actions
  const fetchOptions = (typeof configOptions.fetchOptions !== `undefined`) ?
    configOptions.fetchOptions : 
    {}
  
  var contentType = '';
  
  fetch(configOptions.url, fetchOptions)
    .then(res => {
      contentType = res.headers.get('content-type')
      res.text()
    })
    .then(body => {
      console.log(body);
      const nodeContentDigest = crypto.createHash(`md5`)
        .update(body)
        .digest(`hex`)
        
      const nodeData = Object.assign({}, {
        id: configOptions.id,
        parent: null,
        children: [],
        internal: {
          type: `Http`,
          mediaType: contentType.split(';').shift(),
          content: body,
          contentDigest: nodeContentDigest,
        },
      });
    
      createNode(nodeData);
  })

}