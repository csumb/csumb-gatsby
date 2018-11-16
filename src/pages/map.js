import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/components/site-header'
import Container from 'components/container'
//import { Box, Flex } from '@rebass/grid/emotion'
import styled from 'react-emotion'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import { graphql } from 'gatsby'
import { colors } from 'components/styles/theme'

const MapMap = styled(Map)`
  width: 100%;
  position: relative !important;
  height: 80vh !important;
  min-height: 300px;
`

class MapPage extends React.Component {
  onReady(mapProps, map) {
    map.data.setStyle({
      fillColor: colors.primary.dark,
      fillOpacity: 0.9,
      strokeWeight: 0,
    })
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
        <Container topPadding>
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.data.allMarkdownRemark.edges[0].node.html,
            }}
          />
        </Container>
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
    allMarkdownRemark(filter: { frontmatter: { name: { eq: "map" } } }) {
      edges {
        node {
          html
        }
      }
    }
  }
`
