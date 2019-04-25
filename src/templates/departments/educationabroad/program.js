import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import PageTitle from 'components/header/page-title'
import { Flex, Box } from '@rebass/grid/emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import styled from '@emotion/styled'
import Well from 'components/well'
import { ButtonLink } from 'components/button'
import SiteNavigation from 'components/navigation/site'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { colors } from 'style/theme'
import Link from 'gatsby-link'

import { Table, TableRow, TableHeader, TableCell } from 'components/table'

const CollapsibleIcon = styled(FontAwesomeIcon)`
  margin-right: 0.8rem;
  font-size: 1rem;
`

const CampusMap = styled(Map)`
  width: 100% !important;
  height: 300px !important;
  margin: 1rem 0;
  position: relative !important;
`

const CampusImage = styled('img')`
  margin: 1rem 0;
  display: block;
`

const ProgramDetailsWrapper = styled('div')`
  margin: 1rem 0;
`

const ProgramDetailsHeader = styled('button')`
  padding: 0 0 0.3rem 0;
  cursor: pointer;
  border: 0;
  background: transparent;
  width: 100%;
  border-bottom: 1px solid ${colors.primary.darkest};
  text-align: left;
`

const ProgramMap = GoogleApiWrapper({
  apiKey: 'AIzaSyBFx5aEy_xuJguWMfFEEkqTZAy1q5HF_H0',
})(({ coordinates, google }) => (
  <CampusMap
    google={google}
    zoom={8}
    zoomControl={true}
    scaleControl={false}
    mapTypeControl={false}
    streetViewControl={false}
    initialCenter={{
      lat: coordinates[0].lat,
      lng: coordinates[0].lng,
    }}
  >
    {coordinates.map(coordinate => (
      <Marker key={coordinate.lat} position={coordinate} />
    ))}
  </CampusMap>
))

class ProgramDetails extends React.Component {
  state = {
    isOpen: false,
  }

  render() {
    const { title, children } = this.props
    const { isOpen } = this.state
    return (
      <ProgramDetailsWrapper>
        <h3>
          <ProgramDetailsHeader
            onClick={event => {
              event.preventDefault()
              this.setState({
                isOpen: !isOpen,
              })
            }}
          >
            <CollapsibleIcon
              size="1x"
              icon={isOpen ? faChevronDown : faChevronRight}
            />
            {title}
          </ProgramDetailsHeader>
        </h3>
        {isOpen && <div>{children}</div>}
      </ProgramDetailsWrapper>
    )
  }
}

class ProgramTemplate extends React.Component {
  render() {
    const { navigation, program } = this.props.pageContext
    const { data } = program
    const partner = data.Partner[0]
    const coordinates = []
    if (partner.data.Coordinates) {
      partner.data.Coordinates.split(';').forEach(coordinate => {
        const latLng = coordinate.split(',')
        coordinates.push({
          lat: parseFloat(latLng[0].trim()),
          lng: parseFloat(latLng[1].trim()),
        })
      })
    }

    return (
      <Layout pageTitle={data.Name}>
        <SiteHeader path="/educationabroad">Education Abroad</SiteHeader>
        {navigation && <SiteNavigation navigation={navigation} />}
        <Container>
          <PageTitle>{data.Name}</PageTitle>

          <Well>
            <h2>{data.Application_Deadline_Title}</h2>
            <Flex flexWrap="wrap">
              <Box width={[1, 1 / 2]} pr={[0, 2]}>
                {data.Fall_Spring_Application_Deadline &&
                  data.Fall_Spring_Application_Deadline[0] && (
                    <p>
                      <strong>Fall &amp; Spring deadline:</strong>
                      {data.Fall_Spring_Application_Deadline[0].data.Name}
                    </p>
                  )}
                {data.Summer_Application_Deadline &&
                  data.Summer_Application_Deadline[0] && (
                    <p>
                      <strong>Summer deadline:</strong>
                      {data.Summer_Application_Deadline[0].data.Name}
                    </p>
                  )}
              </Box>
              <Box width={[1, 1 / 2]}>
                <p>
                  These deadlines apply only to the{' '}
                  <a href="https://csumb.edu/educationabroad/go-abroad-short-term-program#heading-8de8bc16-8908-4506-a7e4-e6fe4d576a40">
                    Pre-acceptance phase.
                  </a>{' '}
                  The{' '}
                  <a href="https://csumb.edu/educationabroad/go-abroad-short-term-program#heading-bcc7c580-681c-4a36-865d-3ceb288b49fb">
                    Post-Acceptance phase
                  </a>{' '}
                  must be completed by the mandatory Education Abroad
                  pre-departure orientation.
                </p>
                {data.Apply_Now && (
                  <ButtonLink to={data.Apply_Now}>Apply now</ButtonLink>
                )}
              </Box>
            </Flex>
          </Well>

          {partner.data.Campus_Images && (
            <Flex>
              {partner.data.Campus_Images.map((image, key) => (
                <>
                  {key < 4 && (
                    <Box width={[1, 1 / 4]} pr={[0, 2]} key={key}>
                      <CampusImage alt="" src={image.thumbnails.full.url} />
                    </Box>
                  )}
                </>
              ))}
            </Flex>
          )}
          <h2>Program details</h2>

          <ProgramDetails title="Program dates">
            {data.Program_dates__Fall && (
              <p>
                <strong>Fall</strong> {data.Program_dates__Fall}
              </p>
            )}
            {data.Program_dates__Spring && (
              <p>
                <strong>Spring</strong> {data.Program_dates__Spring}
              </p>
            )}
          </ProgramDetails>
          {data.Prerequisites && (
            <ProgramDetails title="Prerequisites">
              <ul>
                {data.Prerequisites.map(item => (
                  <li>{item.data.Name}</li>
                ))}
              </ul>
            </ProgramDetails>
          )}
          <ProgramDetails title="Housing &amp; food">
            {data.Housing_Details_Paragraph_1 && (
              <p>{data.Housing_Details_Paragraph_1}</p>
            )}
            {data.Housing_Details_Paragraph_2 && (
              <p>{data.Housing_Details_Paragraph_2}</p>
            )}
            {data.Housing_link && (
              <a href={data.Housing_link}>Learn more about housing</a>
            )}
          </ProgramDetails>
          <ProgramDetails title="Estimated fees &amp; conditions">
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Description</TableHeader>
                  <TableHeader>Cost</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Tuition (you pay CSUMB tuition)</TableCell>
                  <TableCell>
                    <Link to="/cost">Cost calculator</Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Education Abroad Application Fee (non-refundable)
                  </TableCell>
                  <TableCell>{data.Education_Abroad_Application_Fee}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Education Abroad Fee</TableCell>
                  <TableCell>{data.Education_Abroad_Fee}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Health insurance</TableCell>
                  <TableCell>{data.Health_Insurance}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Housing &amp; food</TableCell>
                  <TableCell>{data.Housing_Meals}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Round-trip airfare</TableCell>
                  <TableCell>{data.Round_trip_Airfare}</TableCell>
                </TableRow>
              </tbody>
            </Table>
            {data.Additional_Fees_May_Apply && <p>Additional fees may apply</p>}
          </ProgramDetails>
          {data.Campus_services && data.Campus_services.length > 0 && (
            <ProgramDetails title="Campus services">
              <ul>
                {data.Campus_services.map((service, key) => (
                  <li key={`campus_service_${key}`}>{service.data.Name}</li>
                ))}
              </ul>
            </ProgramDetails>
          )}
          <Flex flexWrap="wrap">
            <Box width={[1, 7 / 12]} pr={[0, 2]}>
              <h3>About {data.Name}</h3>
              {data.About_Paragraph_1 && <p>{data.About_Paragraph_1}</p>}

              {data.About_Paragraph_2 && <p>{data.About_Paragraph_2}</p>}

              {data.About_Paragraph_3 && <p>{data.About_Paragraph_3}</p>}

              {partner.data.Campus_website && (
                <p>
                  <a href={partner.data.Campus_website}>Visit campus website</a>
                </p>
              )}
            </Box>
            <Box width={[1, 5 / 12]}>
              <h3>Location</h3>
              {partner.data.City && <>{partner.data.City},</>}{' '}
              {data.Countries[0].data.Name}
              {coordinates.length > 0 && (
                <ProgramMap coordinates={coordinates} />
              )}
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default ProgramTemplate
