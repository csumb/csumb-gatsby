import React from 'react'
import styled from '@emotion/styled'
import parseHtml from '../parse-html'

const DefinitionList = styled('dl')`
  dt {
    font-weight: bold;
  }
  dd {
    margin-left: 1rem;
  }
`

const BlockDefinitionList = ({ list }) => (
  <DefinitionList>
    {list.map(item => (
      <>
        <dt>{parseHtml(item.term)}</dt>
        <dd>{parseHtml(item.definition)}</dd>
      </>
    ))}
  </DefinitionList>
)

export default BlockDefinitionList
