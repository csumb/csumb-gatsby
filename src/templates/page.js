import React from 'react'
//import Link from 'gatsby'
import Blocks from './blocks'
import Layout from '../components/layouts/default'
import SiteNavigation from '../components/layouts/components/siteNavigation'

class PageTemplate extends React.Component {
  render() {
    return (
      <Layout pageTitle={this.props.pageContext.title}>
        <SiteNavigation navigation={this.props.pageContext.navigation}/>
        <h1>hi there {this.props.pageContext.title} in site {this.props.pageContext.site.title}</h1>
        <Blocks blocks={this.props.pageContext.pageContent}/> 
      </Layout>
    )
  }
}

export default PageTemplate
