import React from 'react'
import styled from 'react-emotion'
import Container from 'components/container'

const VideoIframe = styled('iframe')`
  width: 580px;
  height: 320px;
  border: 0;
`

class BlockVideo extends React.Component {
  render() {
    const { provider } = this.props.block.data
    return (
      <Container>
        <VideoIframe
          src={`https://www.youtube.com/embed/${provider.id}`}
          allowFullScreen
        />
      </Container>
    )
  }
}

export default BlockVideo
