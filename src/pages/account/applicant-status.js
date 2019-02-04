import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/header/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import { AccountGroup } from 'components/pages/account'
import { UserContext } from 'components/contexts/user'
import url from 'url'
import { AlertWarning } from 'components/alert'
import { LeadParagraph } from 'components/type'
import Link from 'gatsby-link'

class AccountApplicantStatusPage extends React.Component {
  render() {
    return (
      <Layout pageTitle="Application status">
        <UserContext.Consumer>
          {context => (
            <Container>
              {context.user && (
                <>
                  <PageTitle>
                    {context.user.anonymous ? (
                      <h3>Your applicaion status</h3>
                    ) : (
                      <>
                        {context.user.profile.firstName}{' '}
                        {context.user.profile.lastName}
                      </>
                    )}
                  </PageTitle>
                  {context.user.anonymous ? (
                    <h3>You must be logged in first.</h3>
                  ) : (
                    <>
                      <ApplicantStatus user={context.user} />
                    </>
                  )}
                </>
              )}
            </Container>
          )}
        </UserContext.Consumer>
      </Layout>
    )
  }
}

const Application = ({ term, status, application, checklist, transcripts }) => (
  <>
    <AccountGroup
      legend={`${term.gsx$name} - ${application.academic_plan_descr}`}
    >
      {status.map((status, key) => (
        <div key={key} dangerouslySetInnerHTML={{ __html: status.message }} />
      ))}
    </AccountGroup>
    <Flex flexWrap="wrap">
      <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
        <ApplicationChecklist checklist={checklist} />
      </Box>
      <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
        <ApplicationTranscripts checklist={transcripts} />
      </Box>
    </Flex>
  </>
)

const ApplicationChecklist = props => <AccountGroup legend="Checklist" />

const ApplicationTranscripts = props => <AccountGroup legend="Transcripts" />

const ApplicationMultipleMessage = ({ applications }) => (
  <>
    {applications && applications.length > 1 && (
      <LeadParagraph>
        You have more than one application:{' '}
        {applications.map(application => (
          <Link
            key={application.application.application_number}
            to={`account/applicant-status?app=${
              application.application.application_number
            }`}
          >
            {application.term.gsx$name}{' '}
          </Link>
        ))}
      </LeadParagraph>
    )}
  </>
)

class ApplicantStatus extends React.Component {
  state = {
    applications: false,
    currentApplication: false,
    noApplication: false,
  }

  componentDidMount() {
    window
      .fetch(
        `https://csumb-applicant-api-staging.herokuapp.com/?user=${this.props.user.profile.login.replace(
          '@csumb.edu',
          ''
        )}`
      )
      .then(response => {
        return response.json()
      })
      .then(applications => {
        if (applications._data.length === 0) {
          this.setState({
            noApplication: true,
            applications: true,
          })
          return
        }
        applications = this.processApplications(applications)
        let current = 0
        if (applications && window.location.search.search('app=') > -1) {
          let location = url.parse(window.location.href, true)
          if (location.query && typeof location.query.app !== 'undefined') {
            applications.forEach((application, index) => {
              console.log(application.application)
              if (
                application.application.application_number ===
                location.query.app
              ) {
                current = index
              }
            })
          }
        }
        this.setState({
          applications: applications,
          currentApplication: current,
        })
      })
      .catch(error => {
        this.setState({
          noApplication: true,
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
        checklist: [],
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
        {!this.state.applications ? (
          <p>Loading applications</p>
        ) : (
          <>
            {this.state.noApplication ? (
              <AlertWarning type="polite">
                You do not have any applications.
              </AlertWarning>
            ) : (
              <>
                <ApplicationMultipleMessage
                  applications={this.state.applications}
                />
                <Application
                  {...this.state.applications[this.state.currentApplication]}
                />
              </>
            )}
          </>
        )}
      </>
    )
  }
}

export default AccountApplicantStatusPage
