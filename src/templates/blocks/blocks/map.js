import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import styled from '@emotion/styled'

const MapWrapper = styled('div')`
  width: 100%;
  position: relative !important;
  height: 500px;
`
const BlockMap = ({ zoom, center, features, kml, google }) => {
  return (
    <>
      <span className="content-type-map--zoom">{zoom}</span>
      <span className="content-type-map--center-lat">{center.lat}</span>
      <span className="content-type-map--center-lon">{center.lon}</span>
      <pre className="content-type-map--features">
        {JSON.stringify(features, null, 2)}
      </pre>
      <MapWrapper>
        <Map
          google={google}
          zoom={zoom}
          initialCenter={center}
          onReady={(mapProps, map) => {
            map.data.addGeoJson(features)
            if (kml && kml.url) {
              new mapProps.google.maps.KmlLayer({
                url: kml.url,
                map: map,
              })
            }
          }}
        />
      </MapWrapper>
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.GATSBY_CSUMB_GOOGLE_MAPS_KEY,
})(BlockMap)
