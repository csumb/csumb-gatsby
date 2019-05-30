import React, { Component } from 'react'
import { StaticHero } from 'components/homepages/hero'
import mapData from './serviceLearning.json'
import styled from '@emotion/styled'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import { LeadParagraph } from 'components/common/type'
import { colors } from 'style/theme'
import Link from 'gatsby-link'
import MapPlaceholder from 'components/utilities/map-placeholder'
import BreakpointContext from 'components/contexts/breakpoint'

const InfoWindowContent = styled('p')`
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0;
`

const MobileFloatBox = styled('div')`
  padding: 0 1rem 1rem 1rem;
`

const FloatBox = styled('div')`
  position: absolute;
  top: 40px;
  left: 40px;
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

class HomepageHero extends Component {
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
    const { google } = this.props
    const {
      activeMarker,
      showInfoWindow,
      selectedPlace,
      showPlaceholder,
    } = this.state
    return (
      <BreakpointContext.Consumer>
        {({ isMobile }) => (
          <>
            {isMobile && (
              <MobileFloatBox>
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
              </MobileFloatBox>
            )}
            <StaticHero>
              {!isMobile && (
                <FloatBox>
                  <FloatText>
                    <h1>
                      <Link to="/service/service-learning-quick-facts">
                        Serving our community
                      </Link>
                    </h1>
                    <LeadParagraph>
                      Last year, 3,310 students provided 114,651 hours of
                      service in our community.
                    </LeadParagraph>
                  </FloatText>
                </FloatBox>
              )}
              <MapPlaceholder style={{ height: '500px' }}>
                <Map
                  google={google}
                  zoom={10}
                  zoomControl={true}
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
                    <InfoWindowContent
                      dangerouslySetInnerHTML={{ __html: selectedPlace.name }}
                    />
                  </InfoWindow>
                </Map>
              </MapPlaceholder>
            </StaticHero>
          </>
        )}
      </BreakpointContext.Consumer>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GATSBY_CSUMB_GOOGLE_MAPS_KEY,
})(HomepageHero)
