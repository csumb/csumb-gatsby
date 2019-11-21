import React, { Component } from 'react'
import { Layout, PageTitle } from '../components/layouts/default'
import Container from '../components/common/container'
import moment from 'moment'
import Well from '../components/common/well'
import { HeroParagraph, LeadParagraph } from '../components/common/type'
import Loading from '../components/common/loading'

class StatusPage extends Component {
  state = {
    updown: false,
    lastBuild: false,
  }

  componentDidMount() {
    fetch('https://updown.io/api/checks/c9e7?api-key=ro-fsXi8NABYF7VyJYXiRku')
      .then(response => {
        return response.json()
      })
      .then(status => {
        this.setState({
          updown: status,
        })
      })
    fetch(`/_last-build.json?t=${moment().unix()}`)
      .then(result => {
        return result.json()
      })
      .then(lastBuild => {
        this.setState({
          lastBuild: lastBuild,
        })
      })
      .catch(() => {})
  }

  render() {
    const { updown, lastBuild } = this.state
    return (
      <Layout pageTitle="Website status">
        <Container>
          <PageTitle>Website status</PageTitle>
          <Well>
            <h2>Last build time</h2>
            {lastBuild && <HeroParagraph>{lastBuild.format}</HeroParagraph>}
            <p>
              The <strong>build time</strong> is the last time content has been
              published to the campus website. Any changes to profiles, or
              website information after this time is not published yet.
            </p>
            <p>
              The website is built <strong>every hour</strong>.
            </p>
            <p>
              Look like we're behind? Check{' '}
              <a href="https://www.netlifystatus.com/">
                the status of our website build tool.
              </a>
              <br />
              <img
                src="https://api.netlify.com/api/v1/badges/a6a05a8c-1aad-4f26-928f-375ac47c9b1e/deploy-status"
                alt="Netlify build status"
              />
            </p>
          </Well>
          <Well>
            <h2>Uptime</h2>
            {updown ? (
              <>
                <LeadParagraph>
                  <strong>Uptime:</strong> {updown.uptime}%
                </LeadParagraph>
                <LeadParagraph>
                  <strong>Status:</strong> {updown.down ? <>Down</> : <>Up</>}
                </LeadParagraph>
              </>
            ) : (
              <Loading>Loading status</Loading>
            )}
          </Well>
        </Container>
      </Layout>
    )
  }
}

export default StatusPage
