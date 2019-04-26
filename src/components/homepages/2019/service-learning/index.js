import React from 'react'
import mapData from './data.json'
import styled from '@emotion/styled'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import { LeadParagraph } from 'components/type'
import { colors } from 'style/theme'
import Link from 'gatsby-link'
import { css } from '@emotion/core'
import Container from 'components/common/container'

const MapContainer = styled(Container)`
  position: relative;
`
const InfoWindowContent = styled('div')`
  max-width: 350px;
  margin-bottom: 0;
  p {
    font-size: 1rem;
  }
`

const MobileFloatBox = styled('div')`
  padding: 0 1rem 1rem 1rem;
  h1 {
    a {
      color: ${colors.black};
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
      &:visited {
        color: ${colors.black};
      }
    }
  }
`

const FloatBox = styled('div')`
  position: absolute;
  top: 40px;
  max-width: 400px;
  z-index: 10000;
`

const FloatText = styled('div')`
  max-width: 300px;
  h1 {
    a {
      color: ${colors.black};
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
      &:visited {
        color: ${colors.black};
      }
    }
  }
`

const LoadingContainer = styled('div')`
  height: 500px;
  background: ${colors.primary.light};
`

const mapStyle = {
  height: '500px',
  width: '100%',
}

const MapWrapper = styled('div')`
  ${css(mapStyle)};
  position: relative;
`

class ServiceLearningMap extends React.Component {
  state = {
    selectedPlace: false,
    activeMarker: false,
    showInfoWindow: false,
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
    const { activeMarker, showInfoWindow, selectedPlace } = this.state
    const { google } = this.props
    return (
      <Map
        google={google}
        zoom={10}
        zoomControl={true}
        scaleControl={false}
        mapTypeControl={false}
        streetViewControl={false}
        mapType="TERRAIN"
        initialCenter={{
          lat: 36.6536502,
          lng: -121.7989176,
        }}
      >
        {mapData.map((item, key) => (
          <Marker
            key={key}
            name={item.org}
            students={item.students}
            hours={item.hours}
            position={{ lat: item.lat, lng: item.lon }}
            onClick={this.onMarkerClick.bind(this)}
          />
        ))}
        <InfoWindow
          marker={activeMarker}
          visible={showInfoWindow}
          onClose={this.onInfoWindowClose.bind(this)}
        >
          <InfoWindowContent>
            <h4 dangerouslySetInnerHTML={{ __html: selectedPlace.name }} />
            <p>
              <strong>Number of students: </strong>
              {selectedPlace.students}
            </p>
            <p>
              <strong>Number of hours: </strong>
              {selectedPlace.hours}
            </p>
          </InfoWindowContent>
        </InfoWindow>
      </Map>
    )
  }
}

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

  render() {
    const { google } = this.props
    const { isMobile } = this.state
    return (
      <>
        {isMobile && (
          <>
            <MobileFloatBox>
              <h1>
                <Link to="/service/service-learning-quick-facts">
                  Serving our community
                </Link>
              </h1>
              <LeadParagraph>
                Last year, 3,310 students provided 114,651 hours of service in
                our community.
              </LeadParagraph>
            </MobileFloatBox>
            <MapWrapper>
              <ServiceLearningMap google={google} />
            </MapWrapper>
          </>
        )}
        {!isMobile && (
          <MapWrapper>
            <ServiceLearningMap google={google} />
            <MapContainer>
              <FloatBox>
                <FloatText>
                  <h1>
                    <Link to="/service/service-learning-quick-facts">
                      Serving our community
                    </Link>
                  </h1>
                  <LeadParagraph>
                    Last year, 3,310 students provided 114,651 hours of service
                    in our community.
                  </LeadParagraph>
                </FloatText>
              </FloatBox>
            </MapContainer>
          </MapWrapper>
        )}
      </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBFx5aEy_xuJguWMfFEEkqTZAy1q5HF_H0',
  LoadingContainer: LoadingContainer,
})(HomepageHero)
