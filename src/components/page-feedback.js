import React from 'react'
import Container from 'components/container'
import { LinkyButton } from 'components/button'
import { InputText, Submit } from 'components/forms'
import { AlertInfo } from 'components/alert'
import Well from 'components/well'
import querystring from 'querystring'

const FormPreamble = () => (
  <>
    <h3>Help us improve csumb.edu</h3>
    <p>
      Thanks for helping us improve csumb.edu Spot a broken link, typo, or
      didn't find something where you expected to? Let us know. We'll use your
      feedback to improve this page, and the site overall.
    </p>
  </>
)

class PageFeedbackForm extends React.Component {
  state = {
    feedbackSent: false,
    action: '',
    problem: '',
    email: '',
  }

  handleSubmit(event) {
    event.preventDefault()

    const data = {
      feedbackEmail: this.props.email,
      title: this.props.title,
      action: this.state.action,
      problem: this.state.problem,
      email: this.state.email,
      link: `https://csumb.edu/${this.props.url}`,
    }

    fetch(`https://api.csumb.edu/feedback?${querystring.stringify(data)}`)

    this.setState({
      feedbackSent: true,
    })
  }

  handleAction(event) {
    this.setState({
      action: event.target.value,
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

  render() {
    const { feedbackSent } = this.state

    return (
      <Well>
        {feedbackSent ? (
          <AlertInfo type="polite">
            <h4>Thanks for your help</h4>
            <p>
              The person responsible for fixing this page will get an email with
              your feedback.
            </p>
          </AlertInfo>
        ) : (
          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormPreamble />
            <InputText
              name="action"
              onChange={this.handleAction.bind(this)}
              label="What you were doing"
              required
            />
            <InputText
              name="problem"
              onChange={this.handleProblem.bind(this)}
              label="What went wrong"
              required
            />
            <InputText
              name="email"
              onChange={this.handleEmail.bind(this)}
              label="Your email"
              helpText="Your email address is optional."
            />
            <Submit value="Send feedback" />
          </form>
        )}
      </Well>
    )
  }
}

class PageFeedback extends React.Component {
  state = {
    isOpen: false,
  }

  handleClick(event) {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const { isOpen } = this.state
    return (
      <Container topPadding>
        <LinkyButton onClick={this.handleClick.bind(this)}>
          Is there something wrong with this page?
        </LinkyButton>
        {isOpen && <PageFeedbackForm {...this.props} />}
      </Container>
    )
  }
}

export default PageFeedback
