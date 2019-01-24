import React from 'react'
import Well from 'components/well'
import { colors } from 'components/styles/theme'
import styled from '@emotion/styled'
import Loading from 'components/loading'

const LabBarElement = styled('div')`
  height: 2rem;
  border: 1px solid ${colors.muted.bright};
  background: ${colors.indicators.high};
  position: relative;
`

const LabBarMeasure = styled('div')`
  height: 100%;
  display: inline-block;
  ${props => props.available && `background: ${colors.indicators.low}`}
  ${props => props.offline && `background: ${colors.indicators.medium}`}
`

const LabBar = ({ total, available, offline }) => {
  const availableLength = (available / total) * 100
  const offlineLength = (offline / total) * 100
  return (
    <LabBarElement>
      <LabBarMeasure available style={{ width: `${availableLength}%` }} />
      <LabBarMeasure offline style={{ width: `${offlineLength}%` }} />
    </LabBarElement>
  )
}

const LabelNumberElement = styled('span')`
  display: inline;
  margin-right: 0.5rem;
  strong {
    margin-right: 0.2rem;
  }
`

const LabNumber = ({ label, children }) => (
  <LabelNumberElement>
    <strong>{label}:</strong>
    <span>{children}</span>
  </LabelNumberElement>
)

class Lab extends React.Component {
  state = {
    lab: false,
  }

  componentDidMount() {
    const { lab, customerId } = this.props
    fetch(`https://portal.labstats.com/api/public/GetPublicApiData/${lab}`, {
      headers: {
        Authorization: customerId,
      },
    })
      .then(response => {
        return response.json()
      })
      .then(lab => {
        this.setState({
          lab: lab,
        })
      })
  }

  render() {
    const { lab } = this.state
    return (
      <Well>
        {lab ? (
          <>
            <h3>{lab.Name}</h3>
            <p>
              <LabNumber label="Available">{lab.Available}</LabNumber>
              <LabNumber label="Total">{lab.Total}</LabNumber>
            </p>
            <LabBar
              total={lab.Total}
              available={lab.Available}
              offline={lab.Offline}
            />
          </>
        ) : (
          <Loading />
        )}
      </Well>
    )
  }
}

export { Lab }
