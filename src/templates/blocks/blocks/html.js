import React from 'react'

const approvedBlocks = [
  '3d80d212-9eb7-46a6-81ee-e84f030a77ee',
  'ed6b78ab-7e74-48e3-999d-a15b0712f593',
  '50e4f67b-b751-4087-92dc-7a8e52e3b7d4',
  '8ee0800b-44a0-427c-889c-38d152651f08',
  '12e10967-ae24-4cf6-bbc7-391a17c1ebc2',
  '14388716-3cea-43ee-bcd3-a4458088f7b6',
  '3be2d140-7b6a-44d9-9d95-4ba6950e37b9',
]

const BlockHtml = ({ uuid, html }) => {
  if (approvedBlocks.indexOf(uuid) < 0) {
    return null
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default BlockHtml