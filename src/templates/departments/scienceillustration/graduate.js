import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import PageTitle from 'components/header/page-title'
import { Flex, Box } from '@rebass/grid'

class GraduateTemplate extends React.Component {
  render() {
    const { graduate, images } = this.props.pageContext
    return (
      <Layout pageTitle={title}>
        <SiteHeader path="/scienceillustration">
          Science Illustration
        </SiteHeader>
        <Container>
          <PageTitle>{`${graduate.data.first_name} ${
            graduate.data.last_name
          }`}</PageTitle>
        </Container>
      </Layout>
    )
  }
}

export default GraduateTemplate
