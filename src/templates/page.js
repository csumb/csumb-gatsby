import React from 'react'
//import Link from 'gatsby'
//import Blocks from './blocks/index.js'

class PageTemplate extends React.Component {

  pageContent = false

  PageBlocks() {
    return <div>BLOCKS</div>
  }

  content() {
    if(this.pageContent) {
      return this.pageContent;
    }
    this.pageContent = JSON.parse(this.props.pathContext.pageContent)
    return this.pageContent;
  }

  render() {
    const content = this.content()
    return (
      <div>
        <h1>hi there {content.title}</h1>
        
      </div>
    )
  }
}

export default PageTemplate
