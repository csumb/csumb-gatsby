import React from 'react'
import styled from 'styled-components'
import { ContainerElement } from '../container-context'

const SoundIframe = styled('iframe')`
  border: 0;
  width: 100%;
  height: 166px;
`

class BlockSound extends React.Component {
  render() {
    const { id } = this.props
    return (
      <ContainerElement isFull>
        <SoundIframe
          src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&amp;color=1f346b&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false`}
          title="Sound recording"
        />
      </ContainerElement>
    )
  }
}

export default BlockSound
