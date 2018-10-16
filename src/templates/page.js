import React from 'react'
//import Link from 'gatsby'
import Blocks from './blocks'
import Layout from '../components/layouts/default'
import SiteNavigation from '../components/layouts/components/site-navigation'
import SiteHeader from '../components/layouts/components/site-header'
import Container from '../components/container'

class PageTemplate extends React.Component {
  render() {
    return (
      <Layout pageTitle={this.props.pageContext.title}>
        <SiteHeader title={this.props.pageContext.site.title} path={this.props.pageContext.site.site}/>
        <SiteNavigation navigation={this.props.pageContext.navigation}/>
        <Container>
          <h1>hi there {this.props.pageContext.title} in site </h1>
          <Blocks blocks={this.props.pageContext.pageContent}/> 
        </Container>
      </Layout>
    )
  }
}

export default PageTemplate
