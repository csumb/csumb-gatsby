import React from 'react'
import styled from 'react-emotion'
import Container from 'components/container'

const VideoIframe = styled('iframe')`
  width: 580px;
  height: 320px;
`

class BlockVideo extends React.Component {
  render() {
    return (
      <Container>
        <VideoIframe
          src="//www.youtube.com/embed/{this.props.block.data.id}"
          allowFullScreen
        />
      </Container>
    )
  }
}

export default BlockVideo
