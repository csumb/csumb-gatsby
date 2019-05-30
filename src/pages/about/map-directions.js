import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Blocks from 'templates/blocks'
import styled from '@emotion/styled'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import { graphql } from 'gatsby'
import { colors } from 'style/theme'

const MapMap = styled(Map)`
  width: 100%;
  position: relative !important;
  height: 80vh !important;
  min-height: 300px;
  margin-bottom: 1.5rem;
`

class CsumbMap extends Component {
  onReady(mapProps, map) {
    const infoWindow = new this.props.google.maps.InfoWindow({ maxWidth: 320 })
    map.data.setStyle({
      fillColor: colors.primary.dark,
      fillOpacity: 0.9,
      strokeWeight: 0,
    })
    this.props.buildings.edges.forEach(({ node }) => {
      map.data.addGeoJson({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              name: node.buildingName,
              code: node.code,
              center: node.center,
            },
            geometry: node.outline,
          },
        ],
      })
    })

    map.data.addListener('click', event => {
      const code = event.feature.getProperty('code')
      const name = event.feature.getProperty('name')
      const center = event.feature.getProperty('center')
      infoWindow.setContent(`<a style="font-weight: bold; font-size: 120%; display: inline-block; padding: 0.5rem;" href="/directory/building/${code}">
      ${name}
    </a>`)
      infoWindow.setPosition(center)
      infoWindow.open(map)
    })
  }
  render() {
    const { google } = this.props
    return (
      <MapMap
        google={google}
        zoom={16}
        initialCenter={{
          lat: 36.6536502,
          lng: -121.7989176,
        }}
        onReady={this.onReady.bind(this)}
      />
    )
  }
}

const CsumbMapWrapped = GoogleApiWrapper({
  apiKey: process.env.GATSBY_CSUMB_GOOGLE_MAPS_KEY,
})(CsumbMap)

class MapPage extends Component {
  render() {
    const { data } = this.props
    return (
      <Layout>
        <SiteHeader path="/map">Map</SiteHeader>
        <CsumbMapWrapped buildings={data.allCsumbBuilding} />
        {data.allCsumbPage &&
          data.allCsumbPage.edges &&
          data.allCsumbPage.edges[0] && (
            <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
          )}
      </Layout>
    )
  }
}

export default MapPage

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
