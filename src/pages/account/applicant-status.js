import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import { AccountGroup, AccountTitle, AccountSidebar } from 'components/account'
import User from 'components/user'
import { ButtonLink } from 'components/button'

class AccountApplicantStatusPage extends React.Component {
  render() {
    return (
      <User>
        {user => (
          <Layout pageTitle="Application status">
            <Container>
              {user && (
                <>
                  <PageTitle>
                    {user === 'anonymous' ? (
                      <h3>Your applicaion status</h3>
                    ) : (
                      <>
                        {user.profile.firstName} {user.profile.lastName}
                      </>
                    )}
                  </PageTitle>
                  <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                      <AccountSidebar user={user} />
                    </Box>
                    <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                      {user === 'anonymous' ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <AccountTitle>Application Status</AccountTitle>
                          <ApplicantStatus user={user} />
                        </>
                      )}
                    </Box>
                  </Flex>
                </>
              )}
            </Container>
          </Layout>
        )}
      </User>
    )
  }
}

const Application = props => (
  <AccountGroup
    legend={`${props.term.gsx$name} - ${props.application.academic_plan_descr}`}
  >
    {props.status.map(status => (
      <div dangerouslySetInnerHTML={{ __html: status.message }} />
    ))}
  </AccountGroup>
)

class ApplicantStatus extends React.Component {
  state = {
    application: false,
  }

  componentDidMount() {
    window
      .fetch(`https://csumb-applicant-api-staging.herokuapp.com/?user=esqu6485`)
      .then(response => {
        return response.json()
      })
      .then(applications => {
        this.setState({
          application: this.processApplications(applications),
        })
      })
      .catch(error => {
        this.setState({
          application: 'empty',
        })
      })
  }

  processApplications(apps) {
    let applications = []

    Object.values(apps._data.applications).forEach(application => {
      const term = apps.terms[application.application.admit_term]
      let app = {
        term: term,
        application: application.application,
        status:
          apps.applicant_status[application.application.application_number],
        transcripts:
          apps.transcript_checklist[application.application.application_number],
      }

      applications.push(app)
    })
    return applications
  }

  render() {
    return (
      <>
        {!this.state.application ? (
          <p>Loading applications</p>
        ) : (
          <>
            {this.state.application.map(application => (
              <Application {...application} />
            ))}
          </>
        )}
      </>
    )
  }
}

export default AccountApplicantStatusPage
