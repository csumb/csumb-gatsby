import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'

const ScheduleTerms = styled('ul')`
  list-style-type: none;
  margin: 0;
  li {
    display: inline-block;
    margin-right: 1rem;
  }
`

const ScheduleTermList = ({ terms, currentTerm }) => {
  if (typeof terms[currentTerm.TERM] !== 'undefined') {
    delete terms[currentTerm.TERM]
  }
  return (
    <ScheduleTerms>
      {Object.keys(terms).map(termCode => (
        <li key={termCode}>
          <Link
            to={`/schedule/${terms[termCode].DESCR.replace(
              ' ',
              ''
            ).toLowerCase()}`}
          >
            {terms[termCode].DESCR}
          </Link>
        </li>
      ))}
    </ScheduleTerms>
  )
}

export default ScheduleTermList
