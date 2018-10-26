import React from 'react'
import styled from 'react-emotion'

const VideoIframe = styled('iframe')`
  width: 580px;
  height: 320px;
`

class BlockVideo extends React.Component {
  render() {
    return (
      <>
        <VideoIframe
          src="//www.youtube.com/embed/{this.props.block.data.id}"
          allowFullScreen
        />
      </>
    )
  }
}

export default BlockVideo
