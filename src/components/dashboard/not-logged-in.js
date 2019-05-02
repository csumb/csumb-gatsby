import React from 'react'
import styled from '@emotion/styled'
import Loading from 'components/common/loading'

const loginUrl =
  'https://csumb.okta.com/home/csumb_csumbbetawebsite_1/0oalhdw605Fe37hnQ0x7/alnlhdyx6zseWNBdS0x7'

const NotLoggedIn = styled('div')`
  font-size: 2rem;
  text-align: center;
  margin: 1rem 0;
`

const LoginMessage = styled('p')`
  font-size: 0.8rem;
  margin: 0.5rem 0;
`

class DashboardNotLoggedIn extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      window.location.href = loginUrl
    }, 3000)
  }

  render() {
    return (
      <>
        <NotLoggedIn>
          <p>
            <Loading />
            Logging you in...
          </p>
        </NotLoggedIn>
        <LoginMessage style={{ fontSize: '0.8rem;' }}>
          Not working? <a href={loginUrl}>Login here</a>
        </LoginMessage>
      </>
    )
  }
}

export default DashboardNotLoggedIn
