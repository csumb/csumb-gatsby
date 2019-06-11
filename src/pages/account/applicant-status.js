import React, { Component } from 'react'
import { Layout, PageTitle } from 'components/layouts/default'
import Container from 'components/common/container'
import { Flex, Box } from 'components/common/grid'
import { AccountGroup } from 'components/pages/account'
import styled from '@emotion/styled'
import { Button, ButtonLink } from 'components/common/button'
import { UserContext } from 'components/contexts/user'
import url from 'url'
import { colors } from 'style/theme'
import { AlertWarning } from 'components/common/alert'
import { LeadParagraph } from 'components/common/type'
import Link from 'gatsby-link'
import Well from 'components/common/well'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faBan, faInfo } from '@fortawesome/free-solid-svg-icons'
import VisuallyHidden from 'components/utilities/visually-hidden'
import moment from 'moment'
import Loading from 'components/common/loading'

class AccountApplicantStatusPage extends Component {
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
                    <Well>
                      <h3>You are not logged in</h3>
                      <p>
                        If you have already set up your CSUMB account, click the{' '}
                        <strong>log in</strong> link on the top of the page.
                      </p>
                      <p>
                        If you have not yet setup your CSUMB account,{' '}
                        <a href="https://claim.csumb.edu">
                          you can start the process here
                        </a>
                        .
                      </p>
                    </Well>
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

const Application = ({
  term,
  status,
  application,
  checklist,
  transcripts,
  transcriptHistory,
}) => (
  <>
    <AccountGroup
      legend={`${term.gsx$name} - ${application.academic_plan_descr}`}
    >
      {status.map((status, key) => (
        <div key={key} dangerouslySetInnerHTML={{ __html: status.message }} />
      ))}
    </AccountGroup>
    <Flex>
      <Box width={[1, 1, 1 / 2, 1 / 2]} pr={[0, 4]}>
        <ApplicationChecklist checklist={checklist} />
      </Box>
      <Box width={[1, 1, 1 / 2, 1 / 2]}>
        <ApplicationTranscripts
          transcripts={transcripts}
          transcriptHistory={transcriptHistory}
        />
      </Box>
    </Flex>
  </>
)

const ApplicationChecklist = ({ checklist }) => (
  <AccountGroup legend="Checklist">
    {checklist && checklist.length ? (
      <>
        {checklist.map(item => (
          <Well key={item._row}>
            <Flex>
              <Box width={1 / 4} pr={2}>
                {item._status_icon === 'done' && (
                  <TranscriptDoneIcon icon={faCheckCircle}>
                    <VisuallyHidden>Done</VisuallyHidden>
                  </TranscriptDoneIcon>
                )}
                {item._status_icon === 'not done' && (
                  <TranscriptNotDoneIcon icon={faBan}>
                    <VisuallyHidden>Not done</VisuallyHidden>
                  </TranscriptNotDoneIcon>
                )}
                {item._status_icon === 'informational' && (
                  <TranscriptDoneIcon icon={faInfo}>
                    <VisuallyHidden>Informational</VisuallyHidden>
                  </TranscriptDoneIcon>
                )}
              </Box>
              <Box width={[3 / 4]}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.message,
                  }}
                />
                {!item._hide_due_date && (
                  <p>
                    <strong>Due</strong>{' '}
                    {moment(item.checklist.d_due_dt, 'MM/DD/YYYY').format(
                      'MMMM DD, YYYY'
                    )}
                  </p>
                )}
              </Box>
            </Flex>
          </Well>
        ))}
      </>
    ) : (
      <p>
        <a href="https://csumb.edu/admissions">Visit our website</a> for more
        information about admissions requirements.
      </p>
    )}
  </AccountGroup>
)

const TranscriptDoneIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: ${colors.indicators.low};
`

const TranscriptNotDoneIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: ${colors.indicators.high};
`

class ApplicationTranscripts extends Component {
  state = {
    showTranscriptHistory: false,
  }

  render() {
    const { transcripts, transcriptHistory } = this.props
    return (
      <AccountGroup legend="Transcripts">
        {!transcripts ? (
          <p>We could not find any transcripts.</p>
        ) : (
          <>
            {Object.keys(transcripts).map(transcriptKey => (
              <Well key={transcriptKey}>
                <h3>
                  {transcripts[transcriptKey]._name === 'unknown' ? (
                    <>Transcript still being processesed.</>
                  ) : (
                    <>{transcripts[transcriptKey]._name}</>
                  )}
                </h3>
                {Object.keys(transcripts[transcriptKey]._messages).map(
                  messageKey => (
                    <Flex key={messageKey}>
                      <Box width={1 / 4} pr={2}>
                        {transcripts[transcriptKey]._messages[messageKey]
                          .done ||
                        transcripts[transcriptKey]._messages[messageKey]
                          .in_progress ? (
                          <TranscriptDoneIcon icon={faCheckCircle}>
                            <VisuallyHidden>Done</VisuallyHidden>
                          </TranscriptDoneIcon>
                        ) : (
                          <TranscriptNotDoneIcon icon={faBan}>
                            <VisuallyHidden>Not done</VisuallyHidden>
                          </TranscriptNotDoneIcon>
                        )}
                      </Box>
                      <Box
                        width={[3 / 4]}
                        dangerouslySetInnerHTML={{
                          __html:
                            transcripts[transcriptKey]._messages[messageKey]
                              .message,
                        }}
                      />
                    </Flex>
                  )
                )}
              </Well>
            ))}
            <p>
              <Button
                onClick={event => {
                  event.preventDefault()
                  this.setState({
                    showTranscriptHistory: !this.state.showTranscriptHistory,
                  })
                }}
              >
                View transcript history
              </Button>
            </p>

            {this.state.showTranscriptHistory && (
              <ul>
                {Object.keys(transcriptHistory).map(id => (
                  <li key={id}>{transcriptHistory[id]._name}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </AccountGroup>
    )
  }
}

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

class ApplicantStatus extends Component {
  state = {
    applications: false,
    currentApplication: false,
    noApplication: false,
  }

  componentDidMount() {
    window
      .fetch(
        `https://csumb-applicant-api.herokuapp.com/?user=${this.props.user.profile.login.replace(
          '@csumb.edu',
          ''
        )}`
      )
      .then(response => {
        return response.json()
      })
      .then(applications => {
        if (
          Array.isArray(applications._data) &&
          applications._data.length === 0
        ) {
          this.setState({
            noApplication: true,
            applications: false,
          })
          return
        }
        applications = this.processApplications(applications)
        let current = 0
        if (applications && window.location.search.search('app=') > -1) {
          let location = url.parse(window.location.href, true)
          if (location.query && typeof location.query.app !== 'undefined') {
            applications.forEach((application, index) => {
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
        checklist:
          typeof apps.checklist !== 'undefined' &&
          typeof apps.checklist[application.application.application_number] !==
            'undefined'
            ? apps.checklist[application.application.application_number]
            : [],
        status:
          typeof apps.applicant_status !== 'undefined' &&
          typeof apps.applicant_status[
            application.application.application_number
          ] !== 'undefined'
            ? apps.applicant_status[application.application.application_number]
            : [],
        transcripts:
          typeof apps.transcript_checklist[
            application.application.application_number
          ] !== 'undefined'
            ? apps.transcript_checklist[
                application.application.application_number
              ]
            : [],
        transcriptHistory: apps.transcripts,
      }

      applications.push(app)
    })
    return applications
  }

  render() {
    return (
      <>
        {!this.state.applications ? (
          <Loading>Loading applications</Loading>
        ) : (
          <>
            <p>
              <ButtonLink to="https://csumb.okta.com/home/csumb_oasis_1/0oaj48n6m2kKZX94z0x7/alnj48vefz4sQE6cL0x7">
                Log into OASIS
              </ButtonLink>
            </p>
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
