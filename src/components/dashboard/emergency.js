import React, { Component } from 'react'
import VisuallyHidden from '../utilities/visually-hidden'
import { ButtonLink, LinkyButton } from '../common/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { DialogOverlay, DialogContent } from '../common/dialog'
import { CloseDialog } from './shared-styles'

class DashboardEmergency extends Component {
  state = {
    showDialog: false,
  }

  componentDidMount() {
    const time = new Date()
    fetch(
      `/.netlify/functions/everbridge-get?token=${
        this.props.user.session
      }&user=${this.props.user._username}&_t=${time.getTime()}`
    )
      .then(response => {
        return response.json()
      })
      .then(everbridge => {
        if (
          typeof window !== 'undefined' &&
          window.location.search.search('_fake-emergency') > -1
        ) {
          this.setState({
            showDialog: true,
          })
          return
        }
        if (everbridge.error) {
          return
        }
        if (everbridge.user.optOut) {
          return
        }
        let userHasPhone = false
        everbridge.user.paths.forEach(path => {
          if (path.pathId === 241901148045324) {
            userHasPhone = true
          }
        })
        if (!userHasPhone) {
          this.setState({
            showDialog: true,
          })
        }
      })
  }

  handleOptOut() {
    if (!this.props.user || typeof this.props.user.session === 'undefined') {
      return
    }
    this.setState({
      showDialog: false,
    })
    fetch(
      `/.netlify/functions/everbridge-opt-out?token=${
        this.props.user.session
      }&user=${this.props.user._username}`
    )
  }

  render() {
    return (
      <DialogOverlay
        style={{ background: 'rgba(0, 0, 0, 0.7)' }}
        isOpen={this.state.showDialog}
      >
        <DialogContent>
          <CloseDialog onClick={() => this.setState({ showDialog: false })}>
            <VisuallyHidden>Close dialog</VisuallyHidden>
            <FontAwesomeIcon icon={faTimes} />
          </CloseDialog>
          <h2>Get Otteralerts via text-message </h2>
          <p>
            To receive OTTERalert emergency notifications via text-message,
            provide your cell phone number below.
          </p>
          <p>
            You can always manage your emergency preferences by selecting{' '}
            <strong>Your account</strong> on the CSUMB website.
          </p>
          <p>
            <ButtonLink to="/account/emergency">
              Update emergency information
            </ButtonLink>
          </p>
          <LinkyButton onClick={this.handleOptOut.bind(this)}>
            Opt out of OTTERalert
          </LinkyButton>
        </DialogContent>
      </DialogOverlay>
    )
  }
}

export default DashboardEmergency
