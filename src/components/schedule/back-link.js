import React from 'react'
import ReturnLink from '../common/return-link'

const ScheduleBackLink = ({ term }) => (
  <ReturnLink to={`/schedule/${term.DESCR.toLowerCase().replace(' ', '')}`}>
    Return to {term.DESCR}
  </ReturnLink>
)

export default ScheduleBackLink
