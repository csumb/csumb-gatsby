import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import PageTitle from 'components/header/page-title'
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'
import { ButtonLink } from 'components/button'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

const BuildingMap = styled(Map)`
  width: 100%;
  position: relative !important;
  height: 300px !important;
`

class BuildingTemplate extends React.Component {
  render() {
    const { title, building } = this.props.pageContext
    const { center, code, buildingName } = building
    return (
      <Layout pageTitle={title}>
        <SiteHeader path="/directory">Directory</SiteHeader>
        <Container>
          <PageTitle>{buildingName}</PageTitle>
          <Flex flexWrap="wrap">
            <Box width={[1, 1 / 2]} px={4}>
              <BuildingMap
                google={this.props.google}
                zoom={16}
                initialCenter={center}
              >
                <Marker name={title} position={center} />
              </BuildingMap>
            </Box>
            <Box width={[1, 1 / 2]} px={4}>
              <ButtonLink
                to={`https://maps.google.com/maps/dir/?api=1&destination=${
                  center.lat
                },${center.lng}`}
              >
                Get directions
              </ButtonLink>
              <p>
                <strong>Building code:</strong> {code}
              </p>
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBFx5aEy_xuJguWMfFEEkqTZAy1q5HF_H0',
})(BuildingTemplate)
