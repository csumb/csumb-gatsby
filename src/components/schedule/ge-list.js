import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'

const GEListElement = styled.ul`
  list-style-type: none;
  margin: 0 0 2rem 0;
`

const GEListItemElement = styled.li`
  margin-bottom: 0.5rem;
`

const GEList = ({ term, type, ge }) => {
  const showList = []
  ge.forEach(({ node }) => {
    if (node.type === type) {
      showList.push(node)
    }
  })
  return (
    <GEListElement>
      {showList.map(ge => (
        <GEListItem
          key={ge.code}
          to={`/schedule/${term.DESCR.toLowerCase().replace(
            ' ',
            ''
          )}/ge/${ge.code.toLowerCase()}`}
        >
          {ge.name}
        </GEListItem>
      ))}
    </GEListElement>
  )
}

const GEListItem = ({ to, children }) => (
  <GEListItemElement>
    <Link to={to}>{children}</Link>
  </GEListItemElement>
)

export { GEList, GEListItem }
