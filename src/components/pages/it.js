import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import color from 'color'
import Loading from 'components/loading'

const ITSystemStatusWrapper = styled('div')`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  p {
    margin: 0;
    font-size: 0.9rem;
  }
  h4: {
    margin-bottom: 0.2rem;
  }
  ${props =>
    props.down
      ? `
    color: ${colors.indicators.high};
    background: ${color(colors.indicators.high)
      .lighten(0.8)
      .hex()};
      
  border-left: 8px solid ${colors.indicators.high};`
      : `color: ${colors.indicators.low};
    background: ${color(colors.indicators.low)
      .lighten(1.5)
      .hex()};
      border-left: 8px solid ${colors.indicators.low};`}
`

const ITSystemStatusItem = ({ down, alias, uptime }) => (
  <ITSystemStatusWrapper down={down}>
    <h4>{alias}</h4>
    <p>
      <strong>Status</strong> {down ? <>Down</> : <>Up</>}{' '}
      <strong>Uptime</strong> {Math.floor(uptime)}%
    </p>
  </ITSystemStatusWrapper>
)

class ITSystemStatus extends React.Component {
  state = {
    status: false,
    didLoad: false,
  }

  componentDidMount() {
    fetch('https://updown.io/api/checks?api-key=ro-fsXi8NABYF7VyJYXiRku')
      .then(response => {
        return response.json()
      })
      .then(status => {
        this.setState({
          didLoad: true,
          status: status,
        })
      })
  }

  render() {
    const { status, didLoad } = this.state

    if (!didLoad) {
      return <Loading />
    }
    return (
      <div>
        {status.map(item => (
          <ITSystemStatusItem {...item} />
        ))}
      </div>
    )
  }
}

export { ITSystemStatus, ITSystemStatusItem }
