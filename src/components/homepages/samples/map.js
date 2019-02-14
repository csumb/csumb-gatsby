import React from 'react'
import { StaticHero } from 'components/homepages/hero'
import mapData from './mapData'
import styled from '@emotion/styled'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import { HeroParagraph } from 'components/type'

const FloatBox = styled('div')`
  position: absolute;
  top: 40px;
  left: 40px;
  max-width: 300px;
  z-index: 10000;
`

const FloatText = styled('div')`
  max-width: 300px;
`
class HomepageHero extends React.Component {
  onReady(mapProps, map) {
    map.data.addGeoJson(mapData)
  }

  render() {
    const { google } = this.props
    return (
      <StaticHero>
        <FloatBox>
          <FloatText>
            <h1>Real service</h1>
            <HeroParagraph>
              Last year, 3,310 students provided 114,651 hours of service in
              community.
            </HeroParagraph>
          </FloatText>
        </FloatBox>
        <Map
          google={google}
          zoom={8}
          zoomControl={false}
          scaleControl={false}
          mapTypeControl={false}
          streetViewControl={false}
          onReady={this.onReady.bind(this)}
          options={{
            mapTypeId: 'terrain',
          }}
          style={{
            height: '500px',
            width: '100%',
            position: 'relative',
          }}
          initialCenter={{
            lat: 36.6536502,
            lng: -121.7989176,
          }}
        />
      </StaticHero>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBFx5aEy_xuJguWMfFEEkqTZAy1q5HF_H0',
})(HomepageHero)
