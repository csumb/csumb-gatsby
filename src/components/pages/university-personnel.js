import React from 'react'

const UniversityPersonnelForm = ({ form }) => {
  if (!form.data.Attachments) {
    return null
  }
  return (
    <>
      <dt>
        <a href={form.data.Attachments[0].url}>{form.data.Name}</a>
      </dt>
      <dd>{form.data.Notes}</dd>
    </>
  )
}

export { UniversityPersonnelForm }
