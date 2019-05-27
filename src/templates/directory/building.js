import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Container from 'components/common/container'
import PageTitle from 'components/layouts/sections/header/page-title'
import styled from '@emotion/styled'
import { Flex, Box } from 'components/common/grid'
import { ButtonLink } from 'components/common/button'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import ReturnLink from 'components/common/return-link'
import { DirectoryNavigation } from 'components/pages/directory'

const BuildingMap = styled(Map)`
  width: 100%;
  position: relative !important;
  height: 300px !important;
`

const BuildingMapItem = ({ center, title, google }) => (
  <BuildingMap
    google={google}
    zoom={16}
    style={{ height: '500px' }}
    initialCenter={center}
  >
    <Marker name={title} position={center} />
  </BuildingMap>
)

const BuildingMapMap = GoogleApiWrapper({
  apiKey: 'AIzaSyBFx5aEy_xuJguWMfFEEkqTZAy1q5HF_H0',
})(BuildingMapItem)

class BuildingTemplate extends Component {
  render() {
    const { title, building } = this.props.pageContext
    const { center, code, buildingName, address, mailingAddress } = building
    return (
      <Layout pageTitle={title}>
        <SiteHeader path="/directory">Directory</SiteHeader>
        <DirectoryNavigation />
        <Container>
          <PageTitle>{buildingName}</PageTitle>
          <ReturnLink to="/directory/buildings">
            List of all buildings
          </ReturnLink>
          <Flex>
            <Box width={[1, 2 / 3]} pr={[0, 4]} style={{ height: '500px' }}>
              <BuildingMapMap center={center} title={title} />
            </Box>
            <Box width={[1, 1 / 3]}>
              <p>
                <strong>Building code:</strong> {code}
              </p>
              <p>
                <ButtonLink
                  to={`https://maps.google.com/maps/dir/?api=1&destination=${
                    center.lat
                  },${center.lng}`}
                >
                  Get directions
                </ButtonLink>
              </p>
              {address && (
                <p>
                  <strong>Address</strong>
                  <address>
                    {address.street}
                    <br />
                    {address.city}, {address.state}
                    {'  '}
                    {address.zip}
                  </address>
                </p>
              )}
              {mailingAddress.display && (
                <p>
                  <strong>Mailing Address</strong>
                  <address>
                    {mailingAddress.street}
                    <br />
                    {mailingAddress.building && (
                      <>
                        {mailingAddress.building}
                        <br />
                      </>
                    )}
                    {mailingAddress.city}, {mailingAddress.state}
                    {'  '}
                    {mailingAddress.zip}
                  </address>
                </p>
              )}
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default BuildingTemplate
