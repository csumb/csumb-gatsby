import React, { useState, useEffect } from 'react'
import { AlertDanger } from '../common/alert'

const DashboardTitleNine = ({ user }) => {
  const [holds, setHolds] = useState(false)

  useEffect(
    () => {
      if (
        typeof user.profile.roles === 'undefined' ||
        user.profile.roles.indexOf('student_matriculated') === -1
      ) {
        return
      }
      fetch(
        `/.netlify/functions/okta-holds?user=${user._username}&token=${
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

  return <>{holds && <TitleNineMessage holds={holds} />}</>
}

const TitleNineMessage = ({ holds, termCode }) => {
  let showT9 = false
  let showTIX = false
  holds.forEach(hold => {
    if (hold.srvc_ind_cd === 'T9') {
      showT9 = true
    }
    if (
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
    <p>
      You need to complete sexual misconduct prevention training. If you do not
      complete this training, it could impact your ability to register for
      classes in the future.{' '}
      <a href="https://studentsuccess.org/SSO/csumb">
        Click here to access the course
      </a>
      . In addition, check your CSUMB email account for a message containing
      additional information about this online training.{' '}
      <a href="mailto:agessler@csumb.edu">Contact the Title IX office</a> if you
      have any questions. This message will be removed a day after you complete
      training.
    </p>
  </AlertDanger>
)

const TitleNineTIX = () => (
  <AlertDanger>
    <p>
      You have a hold that will prevent you from registering for future classes.
      To remove this hold, you must take sexual misconduct prevention training,
      which takes about 45 minutes to complete.{' '}
      <a href="https://www.campusclarity.com/signup">Take the training</a>
    </p>
    <p>This message will go away a day after you complete training.</p>
  </AlertDanger>
)

export default DashboardTitleNine
