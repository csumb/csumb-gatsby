import React from 'react'
//import Link from 'gatsby'
import Blocks from './blocks'
import Layout from '../components/layouts/default'
import SiteNavigation from '../components/layouts/components/siteNavigation'

class PageTemplate extends React.Component {
  render() {console.log(this.props.pageContext)
    const navigation = JSON.parse(this.props.pageContext.navigation)
    const content = JSON.parse(this.props.pageContext.pageContent)
    return (
      <Layout pageTitle={this.props.pageContext.title}>
        <SiteNavigation navigation={navigation}/>
        <h1>hi there {this.props.pageContext.title} in site {this.props.pageContext.site.title}</h1>
        <Blocks blocks={content}/> 
      </Layout>
    )
  }
}

export default PageTemplate
