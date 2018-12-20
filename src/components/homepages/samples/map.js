import React from 'react'
import { HeroWrapper } from 'components/homepages/hero'
import { colors } from 'components/styles/theme'
import styled from 'react-emotion'
import { Map, GoogleApiWrapper } from 'google-maps-react'


const MapMap = styled(Map)`
  width: 100%;
  position: relative !important;
`

const MapHeroWrapper = styled(HeroWrapper)`
  background-color: ${colors.muted.light};
`

class HomepageHero extends React.Component {

  render() {
    const { google } = this.props
    return (
      <MapHeroWrapper>
        <MapMap
          google={google}
          zoom={16}
          initialCenter={{
            lat: 36.6536502,
            lng: -121.7989176,
          }}
        />
      </MapHeroWrapper>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBFx5aEy_xuJguWMfFEEkqTZAy1q5HF_H0',
})(HomepageHero)