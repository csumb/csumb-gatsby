import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import moment from 'moment'
import PageTitle from 'components/layouts/sections/header/page-title'
import Well from 'components/well'
import { HeroParagraph, LeadParagraph } from 'components/type'
import Loading from 'components/loading'

class StatusPage extends React.Component {
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
    fetch(`/_last-build.json?t=${moment.unix()}`)
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
              The website is built <strong>every 15 minutes</strong>.
            </p>
            <p>
              Look like we're behind? Check{' '}
              <a href="https://www.traviscistatus.com/">
                the status of our website build tool
              </a>
              .
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
