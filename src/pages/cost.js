import React, { Component } from 'react'
import {
  Layout,
  PageTitle,
  SiteHeader,
  SiteNavigation,
} from '../components/layouts/default'
import Container from '../components/common/container'
import { HeroParagraph } from '../components/common/type'
import { graphql } from 'gatsby'
import { Button, LinkyButton } from '../components/common/button'
import { Flex, Box } from '../components/common/grid'
import Link from 'gatsby-link'
import { InputText, Submit } from '../components/common/forms'
import styled from '@emotion/styled'
import VisuallyHidden from '../components/utilities/visually-hidden'
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from '../components/common/table'
import PageFeedbackContext from '../components/contexts/page-feedback'

const CostButton = styled(Button)`
  width: 80%;
  margin: 0 auto 1.5rem auto;
`

const tuition = [
  {
    name: 'Tuition fee',
    fee: 1665,
    questions: {
      undergraduate: 'yes',
      units: 'no',
    },
  },
  {
    name: 'Tuition fee',
    fee: 2871,
    questions: {
      undergraduate: 'yes',
      units: 'yes',
    },
  },
  {
    name: 'Tuition fee',
    fee: 2082,
    questions: {
      undergraduate: 'no',
      units: 'no',
    },
  },
  {
    name: 'Tuition fee',
    fee: 3588,
    questions: {
      undergraduate: 'no',
      units: 'yes',
    },
  },
]

const fees = [
  {
    name: 'Materials, services, and facilities fee',
    fee: 82.5,
  },
  {
    name: 'Student health services',
    fee: 57,
  },
  {
    name: 'Student mental health services',
    fee: 36,
  },
  {
    name: 'Associated student body fee',
    fee: 48,
  },
  {
    name: 'Student Union fee',
    fee: 350,
  },
  {
    name: 'Sports, Recreation & Leisure - IRA Fee',
    fee: 127,
  },
]

const nonResidentPerUnitFee = 396

const ResidencyQuestion = ({ handler }) => (
  <>
    <HeroParagraph>Are you a California resident?</HeroParagraph>
    <Flex>
      <Box width={[1 / 2]} pr={[2, 4]}>
        <CostButton huge block onClick={handler} data-value="yes">
          Yes
          <VisuallyHidden>, I am a california resident</VisuallyHidden>
        </CostButton>
      </Box>
      <Box width={[1 / 2]}>
        <CostButton huge block onClick={handler} data-value="no">
          No
          <VisuallyHidden>, I am not a california resident</VisuallyHidden>
        </CostButton>
        <p>
          If you are unsure of your residency status, read the{' '}
          <Link to="/catalog/residency-immigration-requirements#determination-residency">
            residency determination page
          </Link>{' '}
          in the catalog.
        </p>
      </Box>
    </Flex>
  </>
)

const UndergraduateQuestion = ({ handler }) => (
  <>
    <HeroParagraph>Are you an undergraduate?</HeroParagraph>
    <Flex>
      <Box width={[1 / 2]} px={2}>
        <CostButton huge block onClick={handler} data-value="yes">
          Yes
          <VisuallyHidden>I am an undergraduate</VisuallyHidden>
        </CostButton>
        <p>I am going to school for a bachelor's degree.</p>
      </Box>
      <Box width={[1 / 2]} px={2}>
        <CostButton huge block onClick={handler} data-value="no">
          No
          <VisuallyHidden>
            , I am working on my masters, or postbac degree
          </VisuallyHidden>
        </CostButton>
        <p>
          No, I am working on my <strong>master's degree</strong>,{' '}
          <strong>post-baccalaureate degree</strong>, or{' '}
          <strong>teaching credential</strong>.
        </p>
      </Box>
    </Flex>
  </>
)

const UnitsQuestion = ({ handler }) => (
  <>
    <HeroParagraph>Are you taking more than 6 units? </HeroParagraph>
    <Flex>
      <Box width={[1 / 2]} px={2}>
        <CostButton huge block onClick={handler} data-value="yes">
          Yes
          <VisuallyHidden>, I am taking more than 6 units</VisuallyHidden>
        </CostButton>
        <p>I will be taking more than 6 units of coursework.</p>
      </Box>
      <Box width={[1 / 2]} px={2}>
        <CostButton huge block onClick={handler} data-value="no">
          No
          <VisuallyHidden>, I taking less than 6 units</VisuallyHidden>
        </CostButton>
        <p>I will be taking 1 to 6 units of coursework.</p>
      </Box>
    </Flex>
  </>
)

const SpecificUnitsQuestion = ({ handler, handleChange }) => (
  <>
    <HeroParagraph>How many units are you planning on taking?</HeroParagraph>
    <form onSubmit={handler}>
      <Flex>
        <Box width={[1, 3 / 4]} px={2}>
          <InputText
            name="units"
            label="How many units are you planning on taking?"
            huge
            hideLabel
            onChange={handleChange}
          />
        </Box>
        <Box width={[1, 1 / 4]} px={2}>
          <Submit value="Search" huge nomargin />
        </Box>
      </Flex>
    </form>
  </>
)

const CostResults = ({ resident, undergraduate, moreThanSixUnits, units }) => {
  let totalTuition = 0
  let total = 0
  fees.forEach(fee => {
    total = total + fee.fee
  })
  if (resident === 'no') {
    total = total + units * nonResidentPerUnitFee
    moreThanSixUnits = units > 6 ? 'yes' : 'no'
  }
  tuition.forEach(fee => {
    if (
      fee.questions.undergraduate === undergraduate &&
      fee.questions.units === moreThanSixUnits
    ) {
      totalTuition = fee.fee
      total = total + fee.fee
    }
  })
  return (
    <>
      <HeroParagraph>
        Your semester tuition is ${total.toFixed(2)}
      </HeroParagraph>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Fee</TableHeader>
            <TableHeader>Amount</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {resident === 'no' && (
            <TableRow>
              <TableCell>
                Non resident fee ($
                {nonResidentPerUnitFee.toFixed(2)} per unit)
              </TableCell>
              <TableCell>
                ${(units * nonResidentPerUnitFee).toFixed(2)}
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell>Tuition fee</TableCell>
            <TableCell>${totalTuition.toFixed(2)}</TableCell>
          </TableRow>
          {fees.map(fee => (
            <TableRow>
              <TableCell>{fee.name}</TableCell>
              <TableCell>${fee.fee.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <ul>
        <li>
          More details about{' '}
          <a href="/housing/rates">on-campus housing rates</a>. (from Student
          Housing &amp; Residential Life)
        </li>
        <li>
          More details about <a href="/mealplan">on-campus meal plans</a>. (from
          A’viands)
        </li>
      </ul>
    </>
  )
}

class CostPageForm extends Component {
  state = {
    resident: false,
    undergraduate: false,
    moreThanSixUnits: false,
    units: false,
    specificUnits: false,
  }

  handleResidency(event) {
    this.setState({
      resident: event.target.dataset.value,
    })
  }

  handleUndergraduates(event) {
    this.setState({
      undergraduate: event.target.dataset.value,
    })
  }

  handleUnits(event) {
    this.setState({
      moreThanSixUnits: event.target.dataset.value,
    })
  }

  handleSpecificUnits(event) {
    event.preventDefault()
    this.setState({
      units: this.state.specificUnits,
    })
  }

  handleSpecificUnitsChange(event) {
    this.setState({
      specificUnits: event.target.value,
    })
  }

  startOver(event) {
    event.preventDefault()
    this.setState({
      resident: false,
      undergraduate: false,
      moreThanSixUnits: false,
      units: false,
      specificUnits: false,
    })
  }

  render() {
    const { resident, undergraduate, moreThanSixUnits, units } = this.state
    return (
      <>
        {!resident ? (
          <ResidencyQuestion handler={this.handleResidency.bind(this)} />
        ) : (
          <>
            {!undergraduate ? (
              <UndergraduateQuestion
                handler={this.handleUndergraduates.bind(this)}
              />
            ) : (
              <>
                {!(moreThanSixUnits || units) ? (
                  <>
                    {resident !== 'no' ? (
                      <>
                        <UnitsQuestion handler={this.handleUnits.bind(this)} />
                      </>
                    ) : (
                      <>
                        <SpecificUnitsQuestion
                          handleChange={this.handleSpecificUnitsChange.bind(
                            this
                          )}
                          handler={this.handleSpecificUnits.bind(this)}
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <CostResults {...this.state} />
                  </>
                )}
              </>
            )}
            <p>
              <LinkyButton onClick={this.startOver.bind(this)}>
                ← Start over
              </LinkyButton>
            </p>
          </>
        )}
      </>
    )
  }
}

class CostPage extends Component {
  render() {
    const { data } = this.props
    return (
      <PageFeedbackContext.Provider
        value={{ email: 'webservices@csumb.edu', title: 'Cost', url: '/cost' }}
      >
        <Layout>
          <SiteHeader path="/cost">Costs &amp; Aid</SiteHeader>
          {data.allCsumbNavigation &&
            data.allCsumbNavigation.edges &&
            data.allCsumbNavigation.edges[0] && (
              <SiteNavigation
                navigation={data.allCsumbNavigation.edges[0].node.navigation}
              />
            )}
          <Container>
            <PageTitle layout="page">Cost calculator</PageTitle>
            <p>
              Effective Fall 2019,
              <a href="https://csumb.github.io/net-price.html">
                view full net price calculator
              </a>
              .
            </p>
            <CostPageForm />
          </Container>
        </Layout>
      </PageFeedbackContext.Provider>
    )
  }
}

export default CostPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "cost" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allCsumbNavigation(filter: { site: { eq: "cost" } }) {
      edges {
        node {
          site
          navigation
        }
      }
    }
  }
`
