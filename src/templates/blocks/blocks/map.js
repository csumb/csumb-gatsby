import React from 'react'
import { ContainerElement } from '../container-context'
import { Map, GoogleApiWrapper } from 'google-maps-react'

class BlockMap extends React.Component {
  onReady(mapProps, map) {
    map.data.addGeoJson(this.props.features)
  }

  render() {
    const { zoom, center } = this.props

    return (
      <ContainerElement isFull>
        <Map
          google={this.props.google}
          zoom={zoom}
          initialCenter={center}
          onReady={this.onReady.bind(this)}
        />
      </ContainerElement>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBFx5aEy_xuJguWMfFEEkqTZAy1q5HF_H0',
})(BlockMap)
