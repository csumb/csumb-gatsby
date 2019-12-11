import React from 'react'

const BlockPerson = ({ email, uuid, compact }) => (
  <>
    <span className="content-type-person--email">{email}</span>
    <span className="content-type-person--compact">{compact}</span>
  </>
)

export default BlockPerson
