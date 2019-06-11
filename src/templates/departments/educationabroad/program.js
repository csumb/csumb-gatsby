import React, { Component } from 'react'
import { Layout } from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Container from 'components/common/container'
import PageTitle from 'components/layouts/sections/header/page-title'
import { Flex, Box } from 'components/common/grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import styled from '@emotion/styled'
import Well from 'components/common/well'
import { ButtonLink } from 'components/common/button'
import { SiteNavigation } from 'components/layouts/sections/navigation'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { colors } from 'style/theme'
import Link from 'gatsby-link'
import ReturnLink from 'components/common/return-link'

import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from 'components/common/table'

const ApplyNowButton = styled(ButtonLink)`
  margin-left: 1rem;
`

const CollapsibleIcon = styled(FontAwesomeIcon)`
  margin-right: 0.8rem;
  font-size: 1rem;
`

const CollapseIconWrapper = styled.span`
  display: inline-block;
  max-width: 50px;
`

const CampusMap = styled(Map)`
  width: 100% !important;
  height: 300px !important;
  margin: 1rem 0;
  position: relative !important;
`

const CampusImage = styled.img`
  margin: 1rem 0;
  display: block;
`

const ProgramDetailsWrapper = styled.div`
  margin: 1rem 0;
`

const ProgramDetailsHeader = styled.button`
  padding: 0 0 0.3rem 0;
  cursor: pointer;
  border: 0;
  background: transparent;
  width: 100%;
  border-bottom: 1px solid ${colors.primary.darkest};
  text-align: left;
`

const ProgramMap = GoogleApiWrapper({
  apiKey: process.env.GATSBY_CSUMB_GOOGLE_MAPS_KEY,
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

class ProgramDetails extends Component {
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
            <CollapseIconWrapper>
              <CollapsibleIcon
                size="1x"
                icon={isOpen ? faChevronDown : faChevronRight}
              />
            </CollapseIconWrapper>
            {title}
          </ProgramDetailsHeader>
        </h3>
        {isOpen && <div>{children}</div>}
      </ProgramDetailsWrapper>
    )
  }
}

class ProgramTemplate extends Component {
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
          {data.Program_Type === 'Semester' ? (
            <ReturnLink to="/educationabroad/programs/semester">
              View all Semester programs
            </ReturnLink>
          ) : (
            <ReturnLink to="/educationabroad/programs/summer">
              View all Summer programs
            </ReturnLink>
          )}
          <Well>
            <Flex>
              <Box width={[1, 1 / 2]} pr={[0, 2]}>
                <h2>{data.Application_Deadline_Title}</h2>
                {data.Fall_Spring_Application_Deadline &&
                  data.Fall_Spring_Application_Deadline[0] && (
                    <ul>
                      {data.Fall_Spring_Application_Deadline.map(deadline => (
                        <li key={deadline.data.Name}>{deadline.data.Name}</li>
                      ))}
                    </ul>
                  )}
                {data.Summer_Application_Deadline &&
                  data.Summer_Application_Deadline[0] && (
                    <ul>
                      {data.Summer_Application_Deadline.map(deadline => (
                        <li key={deadline.data.Name}>{deadline.data.Name}</li>
                      ))}
                    </ul>
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
                <p>
                  {data.Program_Type === 'Semester' ? (
                    <ButtonLink to="/educationabroad/go-abroad-semesteryear-long-program">
                      Application instructions
                    </ButtonLink>
                  ) : (
                    <ButtonLink to="/educationabroad/go-abroad-short-term-program">
                      Application instructions
                    </ButtonLink>
                  )}
                  {data.Apply_Now && (
                    <ApplyNowButton to={data.Apply_Now}>
                      Apply now
                    </ApplyNowButton>
                  )}
                </p>
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
          {data.Summer_Program_Dates && (
            <ProgramDetails title="Program dates">
              <p
                dangerouslySetInnerHTML={{ __html: data.Summer_Program_Dates }}
              />
            </ProgramDetails>
          )}
          <ProgramDetails title="Program dates">
            <ul>
              {data.Program_dates__Fall && (
                <li>
                  <strong>Fall</strong> {data.Program_dates__Fall}
                </li>
              )}
              {data.Program_dates__Spring && (
                <li>
                  <strong>Spring</strong> {data.Program_dates__Spring}
                </li>
              )}
            </ul>
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
          <ProgramDetails title="Academics">
            {data.Program_Type === 'Semester' ? (
              <ul>
                {data.Areas.map(({ data }) => (
                  <li key={data.Subject_Area}>{data.Subject_Area}</li>
                ))}
              </ul>
            ) : (
              <ul>
                {data.Summer_Academics.map(({ data }) => (
                  <li key={data.Name}>{data.Name}</li>
                ))}
              </ul>
            )}
            {data.Notes_Area && <p>{data.Notes_Area}</p>}
          </ProgramDetails>
          <ProgramDetails title="Housing &amp; food">
            {data.Housing_Details_Paragraph_1 && (
              <p>{data.Housing_Details_Paragraph_1}</p>
            )}
            {data.Housing_Details_Paragraph_2 && (
              <p>{data.Housing_Details_Paragraph_2}</p>
            )}
            {data.Housing_link && (
              <ButtonLink to={data.Housing_link}>
                Learn more about housing
              </ButtonLink>
            )}
          </ProgramDetails>
          <ProgramDetails title="Estimated fees &amp; conditions">
            <Table alternateRows={true}>
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

            {data.Summer_Fee_Waiver_Conditions && (
              <p>{data.Summer_Fee_Waiver_Conditions}</p>
            )}
            {data.Additional_Fees_May_Apply && <p>Additional fees may apply</p>}
            {data.Financial_Aid_Available && (
              <p>
                <strong>Financial aid:</strong> State and Federal aid available
              </p>
            )}
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
          <h3>About {data.Name}</h3>
          {data.About_Paragraph_1 && <p>{data.About_Paragraph_1}</p>}
          {data.About_Paragraph_2 && <p>{data.About_Paragraph_2}</p>}
          {data.About_Paragraph_3 && <p>{data.About_Paragraph_3}</p>}
          {partner.data.Campus_website && (
            <p>
              <ButtonLink to={partner.data.Campus_website}>
                Visit campus website
              </ButtonLink>
            </p>
          )}
          <h3>Location</h3>
          {partner.data.City && <>{partner.data.City},</>}{' '}
          {data.Countries[0].data.Name}
          {coordinates.length > 0 && <ProgramMap coordinates={coordinates} />}
        </Container>
      </Layout>
    )
  }
}

export default ProgramTemplate
