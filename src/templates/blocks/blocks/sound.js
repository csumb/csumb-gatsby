import React from 'react'
import styled from '@emotion/styled'

const SoundIframe = styled('iframe')`
  border: 0;
  width: 100%;
  height: 166px;
`

const BlockSound = ({ id }) => (
  <SoundIframe
    src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&amp;color=1f346b&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false`}
    title="Sound recording"
  />
)

export default BlockSound
