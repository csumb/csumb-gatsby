import React from 'react'
import { css } from 'emotion'

const PageTitle = props => {
  if (props.layout === 'site') {
    return null
  }
  return (
    <h1
      className={css`
        border-bottom: 1px solid #000;
      `}
    >
      {props.children}
    </h1>
  )
}

export default PageTitle
