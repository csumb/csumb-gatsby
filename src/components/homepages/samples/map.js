import React from 'react'
import { StaticHero } from 'components/homepages/hero'
import mapData from './serviceLearning.json'
import styled from '@emotion/styled'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
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

class HomepageHero extends React.Component {
  state = {
    isMobile: false,
    selectedPlace: false,
    activeMarker: false,
    showInfoWindow: false,
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

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showInfoWindow: true,
    })
  }

  onInfoWindowClose() {
    this.setState({
      showInfoWindow: false,
      activeMarker: false,
    })
  }

  render() {
    const { google } = this.props
    const { isMobile, activeMarker, showInfoWindow, selectedPlace } = this.state
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
          zoom={10}
          zoomControl={false}
          scaleControl={false}
          mapTypeControl={false}
          streetViewControl={false}
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
        >
          {mapData.map((item, key) => (
            <Marker
              key={key}
              name={item.text}
              position={{ lat: item.lat, lng: item.lon }}
              onClick={this.onMarkerClick.bind(this)}
            />
          ))}
          <InfoWindow
            marker={activeMarker}
            visible={showInfoWindow}
            onClose={this.onInfoWindowClose.bind(this)}
          >
            <p dangerouslySetInnerHTML={{ __html: selectedPlace.name }} />
          </InfoWindow>
        </Map>
      </StaticHero>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBFx5aEy_xuJguWMfFEEkqTZAy1q5HF_H0',
})(HomepageHero)
