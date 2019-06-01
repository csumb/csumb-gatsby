import React from 'react'

const approvedBlocks = [
  '3d80d212-9eb7-46a6-81ee-e84f030a77ee', //https://csumb.edu/library
  'ed6b78ab-7e74-48e3-999d-a15b0712f593', //https://csumb.edu/library/durable-links-articles
  '50e4f67b-b751-4087-92dc-7a8e52e3b7d4', // "
  '8ee0800b-44a0-427c-889c-38d152651f08', // "
  '12e10967-ae24-4cf6-bbc7-391a17c1ebc2', // "
  '14388716-3cea-43ee-bcd3-a4458088f7b6', //https://csumb.edu/library/video-audio-images
  '3be2d140-7b6a-44d9-9d95-4ba6950e37b9', //https://csumb.edu/library/audio
  'a6dda617-0a0f-4c9e-9ce3-80ec3adb3037', //https://csumb.edu/educationabroad/semesteryear-programs-subject-area
  'bf244476-74fb-4c1c-a7c4-c7e255a7e445', //https://csumb.edu/undersea/archive-holdings
  'a67cde8b-f15d-4a22-9cd0-e458a7853a62', //https://csumb.edu/ottermedia
  'fd95ae30-4f8e-4fb4-baa0-773119f27446', //https://csumb.edu/affairs/university-name
]

const BlockHtml = ({ uuid, html }) => {
  if (approvedBlocks.indexOf(uuid) < 0) {
    return null
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default BlockHtml
