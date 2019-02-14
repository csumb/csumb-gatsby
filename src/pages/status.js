import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import PageTitle from 'components/header/page-title'
import moment from 'moment'
import Well from 'components/well'
import { HeroParagraph, LeadParagraph } from 'components/type'
import Loading from 'components/loading'

class StatusPage extends React.Component {
  state = {
    updown: false,
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
  }

  render() {
    const { updown } = this.state
    return (
      <Layout pageTitle="Library">
        <Container>
          <PageTitle>Website status</PageTitle>
          <Well>
            <h2>Last build time</h2>
            <HeroParagraph>
              {moment().format('MMMM D YYYY, h:mm:ss a')}
            </HeroParagraph>
            <p>
              The <strong>build time</strong> is the last time content has been
              published to the campus website. Any changes to profiles, or
              website information after this time is not published yet.
            </p>
          </Well>
          <Well>
            <h2>Status &amp; uptime</h2>
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
