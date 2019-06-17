import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import { colors } from '../../style'

const BylineElement = styled.div`
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: ${colors.primary.light};
`

const Byline = ({ person, children }) => (
  <BylineElement>
    {person && (
      <>
        By{' '}
        <Link to={`/directory/person/${person.email.split('@').shift()}`}>
          {person.firstName} {person.lastName}
        </Link>
        {' | '}
      </>
    )}
    {children}
  </BylineElement>
)

export default Byline
