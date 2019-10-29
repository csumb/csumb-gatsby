import React, { useState, useEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { AlertDanger } from '../common/alert'

const DashboardTitleNine = ({ user }) => {
  const [holds, setHolds] = useState(false)

  useEffect(
    () => {
      fetch(
        `/cloud-functions/okta/holds?username=${user._username}&token=${
          user.session
        }`
      )
        .then(response => {
          return response.json()
        })
        .then(holds => {
          if (
            !holds ||
            typeof holds.success === 'undefined' ||
            !holds.success
          ) {
            return
          }
          setHolds(holds.holds)
        })
    },
    [user]
  )

  return (
    <>
      {holds && (
        <StaticQuery
          query={graphql`
            query SettingQuery {
              site {
                siteMetadata {
                  titleNineMessage {
                    termCode
                  }
                }
              }
            }
          `}
          render={data => (
            <TitleNineMessage
              holds={holds}
              termCode={data.site.siteMetadata.titleNineMessage.termCode}
            />
          )}
        />
      )}
    </>
  )
}

const TitleNineMessage = ({ holds, termCode }) => {
  let showT9 = false
  let showTIX = false
  holds.forEach(hold => {
    if (hold.active_term >= termCode && hold.srvc_ind_cd === 'T9') {
      showT9 = true
    }
    if (
      hold.active_term >= termCode &&
      hold.srvc_ind_cd === 'TIX' &&
      (hold.srvc_ind_reason === 'T9' ||
        hold.srvc_ind_reason === 'T9C' ||
        hold.srvc_ind_reason === 'TC')
    ) {
      showTIX = true
    }
  })
  return (
    <>
      {showT9 && <TitleNineT9 />}
      {showTIX && <TitleNineTIX />}
    </>
  )
}

const TitleNineT9 = () => (
  <AlertDanger>
    You need to complete sexual misconduct prevention training. If you do not
    complete this training, it could impact registering for classes in the
    future. <a href="mailto:agessler@csumb.edu">Contact the Title IX office</a>{' '}
    if you have any questions.{' '}
    <a href="https://www.campusclarity.com/signup">Take the training</a>
  </AlertDanger>
)

const TitleNineTIX = () => (
  <AlertDanger>
    You have a hold that will prevent you from registering for future classes.
    To remove this hold, you must take sexual misconduct prevention training,
    which takes about 45 minutes to complete.{' '}
    <a href="https://www.campusclarity.com/signup">Take the training</a>
  </AlertDanger>
)

export default DashboardTitleNine
