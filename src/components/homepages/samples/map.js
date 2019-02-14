import React from 'react'
import { StaticHero } from 'components/homepages/hero'
import mapData from './serviceLearning.json'
import styled from '@emotion/styled'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import { LeadParagraph } from 'components/type'

const FloatBox = styled('div')`
  ${props =>
    props.isMobile
      ? `padding: 0 1rem 1rem 1rem;`
      : `position: absolute;
  top: 40px;
  left: 40px;
  max-width: 400px;
  z-index: 10000;`};
`

const FloatText = styled('div')`
  max-width: 300px;
`

const serviceLearningFeatures = {
  type: 'FeatureCollection',
  features: [],
}

mapData.forEach(item => {
  serviceLearningFeatures.features.push({
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Point',
      coordinates: [item.lon, item.lat],
    },
  })
})

class HomepageHero extends React.Component {
  state = {
    isMobile: false,
  }

  componentDidMount() {
    const mobileBreakpoint = 830
    const that = this

    const setWindowSize = () => {
      that.setState({
        isMobile: window.innerWidth <= mobileBreakpoint,
      })
    }

    window.addEventListener('resize', setWindowSize)

    setWindowSize()
  }
  onReady(mapProps, map) {
    map.data.addGeoJson(serviceLearningFeatures)
  }

  render() {
    const { google } = this.props
    const { isMobile } = this.state
    return (
      <StaticHero>
        <FloatBox isMobile={isMobile}>
          <FloatText>
            <h1>Service Learning</h1>
            <LeadParagraph>
              Last year, 3,310 students provided 114,651 hours of service in our
              community.
            </LeadParagraph>
          </FloatText>
        </FloatBox>
        <Map
          google={google}
          zoom={9}
          zoomControl={false}
          scaleControl={false}
          mapTypeControl={false}
          streetViewControl={false}
          onReady={this.onReady.bind(this)}
          mapType="TERRAIN"
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
