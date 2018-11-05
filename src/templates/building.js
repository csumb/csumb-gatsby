import React from 'react'
//import Link from 'gatsby'
import Blocks from './blocks'
import Layout from 'components/layouts/default'
import SiteNavigation from 'components/layouts/components/site-navigation'
import SiteHeader from 'components/layouts/components/site-header'
import Container from 'components/container'
import PageTitle from 'components/page-title'
import Breadcrumbs from 'components/breadcrumbs'

class BuildingTemplate extends React.Component {
  render() {
    return (
      <Layout pageTitle={this.props.pageContext.title}>
        <SiteHeader path="/directory">Directory</SiteHeader>
        <Container>
          <PageTitle>{this.props.pageContext.building.buildingName}</PageTitle>
        </Container>
      </Layout>
    )
  }
}

export default BuildingTemplate
