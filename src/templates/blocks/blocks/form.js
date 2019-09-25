import React from 'react'
import styled from '@emotion/styled'

const FormIframe = styled.iframe`
  width: 100%;
  height: 400px;
  border: 0;
`

const BlockForm = ({ height, provider }) => {
  let formUrl = ''
  if (provider.provider === 'google') {
    formUrl = `https://docs.google.com/a/csumb.edu/forms/d/e/${
      provider.form
    }/viewform?embedded=true`
  }
  if (provider.provider === 'airtable') {
    formUrl = `https://airtable.com/embed/${provider.form}`
  }
  return (
    <FormIframe style={{ height: height + 'px' }} src={formUrl} title="Form" />
  )
}

export default BlockForm
