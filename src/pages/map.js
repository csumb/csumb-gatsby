import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/components/site-header'
import Container from 'components/container'
//import { Box, Flex } from '@rebass/grid/emotion'
import styled from 'react-emotion'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import { graphql } from 'gatsby'

const MapMap = styled(Map)`
  width: 100%;
  position: relative !important;
  height: 75vh !important;
  min-height: 300px;
`

class MapPage extends React.Component {
  onReady(mapProps, map) {
    this.props.data.allCsumbBuilding.edges.forEach(edge => {
      map.data.addGeoJson({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: edge.node.outline,
          },
        ],
      })
    })
  }

  render() {
    const { google } = this.props

    return (
      <Layout>
        <SiteHeader path="/map">Map</SiteHeader>
        <MapMap
          google={google}
          zoom={16}
          initialCenter={{
            lat: 36.6536502,
            lng: -121.7989176,
          }}
          onReady={this.onReady.bind(this)}
        />
        <Container />
      </Layout>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBFx5aEy_xuJguWMfFEEkqTZAy1q5HF_H0',
})(MapPage)

export const query = graphql`
  {
    allCsumbBuilding {
      edges {
        node {
          buildingName
          code
          center {
            lat
            lng
          }
          outline {
            type
            coordinates
          }
        }
      }
    }
  }
`
