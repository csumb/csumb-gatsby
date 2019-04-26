import React from 'react'
import Loading from 'components/loading'
import { InputText, Submit } from 'components/forms'
import Well from 'components/well'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { UserContext } from 'components/contexts/user'
import styled from '@emotion/styled'
import { colors } from 'style/theme'

const SecondaryEmailError = styled('p')`
  color: ${colors.indicators.high};
  margin: 0.5rem 0;
  font-weight: bold;
`

class DashboardSecondaryEmail extends React.Component {
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
      `https://api.csumb.edu/okta/update-secondary?token=${
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

  render() {
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
