import React from 'react'
import Container from 'components/common/container'
import { colors } from 'style/theme'
import styled from '@emotion/styled'
import VisuallyHidden from 'components/utilities/visually-hidden'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const DashboardIntroWrapper = styled('div')`
  padding: 0.2rem 0;
  background: ${colors.indicators.low};
  color: ${colors.white};
  a {
    color: ${colors.white};
    font-weight: bold;
  }
`

const DashboardIntroClose = styled('button')`
  background: transparent;
  border: 0;
  float: right;
  color: ${colors.white};
  cursor: pointer;
`
class DashboardIntro extends React.Component {
  state = {
    hidden: false,
  }

  render() {
    if (cookies.get('csumbDashboardIntro') || this.state.hidden) {
      return null
    }
    return (
      <DashboardIntroWrapper>
        <Container>
          <DashboardIntroClose
            onClick={event => {
              this.setState({
                hidden: true,
              })
              cookies.set('csumbDashboardIntro', '1', { path: '/' })
            }}
          >
            <VisuallyHidden>Hide intro message</VisuallyHidden>
            <FontAwesomeIcon icon={faTimes} />
          </DashboardIntroClose>
          The dashboard has a new look. Your schedule, Ottercard, and more are
          now under <strong>Your account</strong> above.{' '}
          <a href="/dashboard/new">Learn more</a>.
        </Container>
      </DashboardIntroWrapper>
    )
  }
}

export default DashboardIntro
