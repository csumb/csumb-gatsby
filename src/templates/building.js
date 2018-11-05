import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/components/site-header'
import Container from 'components/container'
import PageTitle from 'components/page-title'

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
