import React, { Component } from 'react'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import color from 'color'
import Link from 'gatsby-link'
import Loading from 'components/common/loading'

const displayUpdownTokens = ['dnhg', 'mus6', 'c9e7', 'paxe']

const ITSystemStatusWrapper = styled.div`
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

class ITSystemStatus extends Component {
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
        const currentStatus = []
        status.forEach(item => {
          if (displayUpdownTokens.indexOf(item.token) > -1) {
            currentStatus.push(item)
          }
        })
        this.setState({
          didLoad: true,
          status: currentStatus,
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
          <ITSystemStatusItem key={item.alias} {...item} />
        ))}
      </div>
    )
  }
}

class ITAlerts extends Component {
  alertRef = React.createRef()

  state = {
    alerts: false,
  }

  componentDidMount() {
    if (typeof window === 'undefined') {
      return
    }
    const that = this
    const script = window.document.createElement('script')
    script.src = '//csumbalerts.tumblr.com/api/read/json'
    script.async = false
    this.alertRef.current.parentNode.insertBefore(script, this.alertRef.current)
    script.addEventListener('load', function() {
      that.setState({
        alerts: window.tumblr_api_read,
      })
    })
  }

  render() {
    const { alerts } = this.state
    let alertCount = 0
    if (alerts && alerts.posts) {
      alerts.posts.forEach(alert => {
        if (alert.tags) {
          alert.tags.forEach(tag => {
            if (tag === 'active') {
              alertCount++
            }
          })
        }
      })
    }
    return (
      <p ref={this.alertRef}>
        {alerts && alerts.posts.length > 0 ? (
          <Link to="/it/alerts">
            {alertCount > 1 ? (
              <>There are {alertCount} active alerts</>
            ) : (
              <>There is one active alert</>
            )}
          </Link>
        ) : (
          <>There are no active alerts.</>
        )}
      </p>
    )
  }
}

export { ITAlerts, ITSystemStatus, ITSystemStatusItem }
