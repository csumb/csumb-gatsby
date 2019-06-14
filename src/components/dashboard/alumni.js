import React, { Component } from 'react'
import VisuallyHidden from '../utilities/visually-hidden'
import { Button } from '../common/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { DialogOverlay, DialogContent } from '../common/dialog'
import { CloseDialog, DashboardCard } from './shared-styles'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class DashboardAlumni extends Component {
  state = {
    isReady: false,
    session: false,
    alumniData: false,
    showDialog: false,
    success: false,
    agreed: false,
  }

  componentDidMount() {
    const existing = cookies.get('csumbDashboardAlumni')
    if (existing) {
      this.setState({
        isReady: true,
        alumniData: existing,
      })
      return null
    }
    fetch('https://csumb.okta.com/api/v1/sessions/me', {
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        this.setState({
          isReady: false,
        })
      })
      .then(session => {
        this.setState({
          session: session.id,
        })
        fetch(`https://api.csumb.edu/alumni?token=${session.id}`)
          .then(response => {
            return response.json()
          })
          .then(content => {
            this.setState({
              isReady: true,
              alumniData: content,
            })
            const expiration = new Date()
            expiration.setDate(expiration.getDate() + 3)
            cookies.set('csumbDashboardAlumni', content, {
              expires: expiration,
              path: '/',
            })
          })
          .catch(error => {
            this.setState({
              isready: false,
            })
          })
      })
      .catch(error => {
        this.setState({
          isReady: false,
        })
      })
  }

  handleJoin(event) {
    this.setState({
      showDialog: false,
      success: true,
    })
    fetch(`https://api.csumb.edu/alumni?token=${this.state.session}&register=1`)
    const expiration = new Date()
    expiration.setDate(expiration.getDate() + 10)
    cookies.set(
      'csumbDashboardAlumni',
      { showMessage: false },
      {
        expires: expiration,
        path: '/',
      }
    )
  }

  render() {
    const { isReady, alumniData, showDialog, success, agreed } = this.state
    if (!isReady) {
      return null
    }
    if (!alumniData || !alumniData.showMessage) {
      return null
    }
    return (
      <DashboardCard>
        {success ? (
          <>
            <p>
              You have agreed to the terms for keeping your email after you
              graduate.
            </p>
            <p>
              Be sure to visit <a href="/alumni">csumb.edu/alumni</a> often to
              stay connected.
            </p>
          </>
        ) : (
          <>
            <h3>Welcome to the CSUMB Alumni Association</h3>
            <p>
              Congratulations on graduating! As a member of the Alumni
              Association, you can request to keep your @csumb.edu email.
            </p>
            <p>
              <Button
                onClick={event => {
                  event.preventDefault()
                  this.setState({
                    showDialog: true,
                  })
                }}
              >
                Keep your CSUMB Email
              </Button>
            </p>
          </>
        )}
        {showDialog && (
          <DialogOverlay
            style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            isOpen={this.state.showDialog}
          >
            <DialogContent>
              <CloseDialog onClick={() => this.setState({ showDialog: false })}>
                <VisuallyHidden>Close dialog</VisuallyHidden>
                <FontAwesomeIcon icon={faTimes} />
              </CloseDialog>
              <h2>Join the Alumni Association</h2>
              <p>
                Stay connected with fellow alumni and remain engaged with CSUMB
                as long as you continue to update your contact information. As a
                member you will receive many benefits, including keeping your
                csumb.edu email address.
              </p>
              <p>
                All individuals with a CSUMB email address are required to
                comply with CSUMB’s{' '}
                <a href="https://csumb.edu/policy/policy-acceptable-use-computing-information-technology-resources">
                  Policy on the Acceptable Use of Computing &amp; Information
                  Technology Resources
                </a>{' '}
                and{' '}
                <a href="http://www.calstate.edu/icsuam/documents/Section8000.pdf">
                  CSU’s Responsible Use policy
                </a>
                . Failure to comply with these policies may result in the
                suspension, deletion or termination of the CSUMB email account.
              </p>
              <p>
                <label>
                  <input
                    type="checkbox"
                    onClick={event => {
                      this.setState({
                        agreed: event.target.checked,
                      })
                    }}
                  />{' '}
                  I agree
                </label>
              </p>
              <Button disabled={!agreed} onClick={this.handleJoin.bind(this)}>
                Join alumni association
              </Button>
            </DialogContent>
          </DialogOverlay>
        )}
      </DashboardCard>
    )
  }
}

export default DashboardAlumni
