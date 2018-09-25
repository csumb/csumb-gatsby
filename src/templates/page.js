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
    try{
      this.pageContent = JSON.parse(this.props.pageContext.pageContent)
    }
    catch(e) {
      console.log(`Error processing JSON in `, this.props.pageContext.filePath)
    }
    return this.pageContent;
  }

  render() {
    const content = this.content()
    return (
      <Layout title={this.props.pageContext.title}>
        <h1>hi there {this.props.pageContext.title} in site {this.props.pageContext.site.title}</h1>  
      </Layout>
    )
  }
}

export default PageTemplate
