import React from 'react'
//import Link from 'gatsby'
import Blocks from './blocks'
import Layout from '../components/layouts/default'

class PageTemplate extends React.Component {

  render() {
    return (
      <Layout title={this.props.pageContext.title}>
        <h1>hi there {this.props.pageContext.title} in site {this.props.pageContext.site.title}</h1>
        <Blocks blocks={this.props.pageContext.pageContent}></Blocks>  
      </Layout>
    )
  }
}

export default PageTemplate
