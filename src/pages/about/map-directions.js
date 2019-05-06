import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Blocks from 'templates/blocks'
import styled from '@emotion/styled'
import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react'
import { graphql } from 'gatsby'
import { colors } from 'style/theme'
import Link from 'gatsby-link'

const MapMap = styled(Map)`
  width: 100%;
  position: relative !important;
  height: 80vh !important;
  min-height: 300px;
  margin-bottom: 1.5rem;
`

class MapPage extends React.Component {
  state = {
    currentBuilding: false,
  }

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
            properties: {
              name: edge.node.buildingName,
              code: edge.node.code,
            },
            geometry: edge.node.outline,
          },
        ],
      })
      map.data.addListener('click', event => {
        this.setState({
          currentBuilding: event.feature.getProperty('code'),
        })
      })
    })
  }

  render() {
    const { google, data } = this.props
    const { currentBuilding } = this.state
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
        >
          {this.props.data.allCsumbBuilding.edges.map(({ node }) => (
            <InfoWindow
              position={node.center}
              visible={node.code === currentBuilding}
            >
              <a href={`/building/${node.code}`}>{node.buildingName}</a>
            </InfoWindow>
          ))}
        </MapMap>
        {data.allCsumbPage && (
          <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
        )}
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
    allCsumbPage(filter: { pagePath: { eq: "about/map-directions" } }) {
      edges {
        node {
          pageContent
          layout
        }
      }
    }
  }
`
