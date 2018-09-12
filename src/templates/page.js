import React from 'react'
//import Link from 'gatsby'
import Layout from '../components/layouts/default'

class PageTemplate extends React.Component {

  pageContent = false

  PageBlocks() {
    return <div>BLOCKS</div>
  }

  content() {
    if(this.pageContent) {
      return this.pageContent;
    }
    this.pageContent = JSON.parse(this.props.pageContext.pageContent)
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
