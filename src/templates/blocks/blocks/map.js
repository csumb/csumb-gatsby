import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import styled from '@emotion/styled'

const MapWrapper = styled('div')`
  width: 100%;
  position: relative !important;
  height: 500px;
`
class BlockMap extends Component {
  onReady(mapProps, map) {
    map.data.addGeoJson(this.props.features)
    if (this.props.kml && this.props.kml.url) {
      new mapProps.google.maps.KmlLayer({
        url: this.props.kml.url,
        map: map,
      })
    }
  }

  render() {
    const { zoom, center } = this.props

    return (
      <MapWrapper>
        <Map
          google={this.props.google}
          zoom={zoom}
          initialCenter={center}
          onReady={this.onReady.bind(this)}
        />
      </MapWrapper>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBFx5aEy_xuJguWMfFEEkqTZAy1q5HF_H0',
})(BlockMap)
