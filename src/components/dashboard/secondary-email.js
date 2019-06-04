import React, { Component } from 'react'
import Loading from 'components/common/loading'
import { InputText, Submit } from 'components/common/forms'
import Well from 'components/common/well'
import { DialogOverlay, DialogContent } from 'components/common/dialog'
import { UserContext } from 'components/contexts/user'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import { LinkyButton } from 'components/common/button'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const SecondaryEmailError = styled.p`
  color: ${colors.indicators.high};
  margin: 0.5rem 0;
  font-weight: bold;
`

class DashboardSecondaryEmail extends Component {
  state = {
    secondaryEmail: false,
    didUpdate: false,
    isLoading: false,
  }

  handleSubmit(event) {
    this.setState({
      isLoading: true,
    })
    event.preventDefault()
    fetch(
      `/cloud-functions/okta/secondary-email?token=${
        this.props.session
      }&email=${this.state.secondaryEmail}`
    )
      .then(result => {
        return result.json()
      })
      .then(result => {
        this.setState({
          didUpdate: true,
          isLoading: false,
        })
      })
      .catch(error => {
        this.setState({
          didUpdate: true,
          isLoading: false,
        })
      })
  }

  handleIgnore(event) {
    event.preventDefault()
    this.setState({
      didUpdate: true,
    })
    const expiration = new Date()
    expiration.setDate(expiration.getDate() + 5)
    cookies.set('csumbDashboardSecondary', '1', {
      expires: expiration,
      path: '/',
    })
  }

  render() {
    if (cookies.get('csumbDashboardSecondary')) {
      return null
    }
    const { didUpdate, isLoading } = this.state
    if (didUpdate) {
      return null
    }
    return (
      <UserContext.Consumer>
        {context => (
          <>
            {((typeof window !== 'undefined' &&
              window.location.search.search('_fake-secondary') > -1) ||
              (context.user !== false &&
                (context.user._isStudent || context.user._isEmployee) &&
                !context.user.profile.secondEmail)) && (
              <DialogOverlay
                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
                isOpen={true}
              >
                <DialogContent>
                  <h2>Update your secondary email</h2>
                  <p>
                    If you ever forget your password, you will need a secondary
                    email to regain access to your CSUMB account. You can always
                    edit this email by clicking the{' '}
                    <strong>Your account</strong> link on the top of the CSUMB
                    website.
                  </p>
                  <Well>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                      <InputText
                        name="secondary-update"
                        label="Enter secondary email"
                        onChange={event => {
                          this.setState({
                            secondaryEmail: event.target.value,
                          })
                        }}
                      />
                      {this.state.secondaryEmail &&
                        this.state.secondaryEmail.search('@csumb.edu') > -1 && (
                          <SecondaryEmailError>
                            You cannot use a csumb.edu email address as your
                            secondary email.
                          </SecondaryEmailError>
                        )}
                      <Submit value="Update secondary email" />
                      {isLoading && <Loading>Updating email</Loading>}
                    </form>
                  </Well>
                  <LinkyButton onClick={this.handleIgnore.bind(this)}>
                    Ignore for a while
                  </LinkyButton>
                </DialogContent>
              </DialogOverlay>
            )}
          </>
        )}
      </UserContext.Consumer>
    )
  }
}

export default DashboardSecondaryEmail
