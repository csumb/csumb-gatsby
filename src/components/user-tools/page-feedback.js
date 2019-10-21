import React, { Component } from 'react'
import { LinkyButton } from '../common/button'
import { InputText, Submit, InputTextarea } from '../common/forms'
import { AlertSuccess } from '../common/alert'
import Well from '../common/well'
import querystring from 'querystring'

const FormPreamble = () => (
  <>
    <h3>Help us improve the CSUMB website</h3>
    <p>
      If you found a broken link, typo, or are having an issue with assistive
      technology on this page, please let us know. We'll use your comments to
      improve this page and the site overall.
    </p>
  </>
)

class PageFeedbackForm extends Component {
  state = {
    feedbackSent: false,
    name: '',
    problem: '',
    email: '',
  }

  handleSubmit(event) {
    event.preventDefault()

    const data = {
      feedbackEmail: this.props.email,
      title: this.props.title,
      problem: this.state.problem,
      name: this.state.name,
      email: this.state.email,
      link: `https://csumb.edu/${this.props.url}`,
    }

    fetch(`/cloud-functions/feedback?${querystring.stringify(data)}`)

    this.setState({
      feedbackSent: true,
    })
  }

  handleProblem(event) {
    this.setState({
      problem: event.target.value,
    })
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value,
    })
  }

  handleName(event) {
    this.setState({
      name: event.target.value,
    })
  }

  render() {
    const { feedbackSent } = this.state

    return (
      <Well>
        {feedbackSent ? (
          <AlertSuccess type="polite">
            <h4>Thanks for your help</h4>
            <p>
              The person responsible for fixing this page will get an email with
              your feedback.
            </p>
            <p>
              <LinkyButton onClick={this.props.closeAction}>
                Close this window
              </LinkyButton>
            </p>
          </AlertSuccess>
        ) : (
          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormPreamble />
            <InputTextarea
              name="problem"
              onChange={this.handleProblem.bind(this)}
              label="What went wrong"
              rows="5"
            />

            <InputText
              name="name"
              onChange={this.handleName.bind(this)}
              label="Your name"
              helpText="Your name is optional."
            />
            <InputText
              name="email"
              onChange={this.handleEmail.bind(this)}
              label="Your email"
              helpText="Your email address is optional."
            />
            <Submit value="Send feedback" />
            <p>
              <LinkyButton onClick={this.props.closeAction}>Cancel</LinkyButton>
            </p>
          </form>
        )}
      </Well>
    )
  }
}

export default PageFeedbackForm
