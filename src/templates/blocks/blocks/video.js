import React, { Component } from 'react'
import styled from '@emotion/styled'
import { bp } from '../../../style'

const responsiveWidth = bp({
  width: ['100%', '100%', '75%', '75%'],
})

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 44.25%; /* 16:9 */
  padding-top: 1rem;
  height: 0;
  margin: 0.5rem auto;
  clear: both;
  ${responsiveWidth};
`
const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: 0;
  height: 100%;
`

class BlockVideo extends Component {
  render() {
    const { provider } = this.props
    return (
      <VideoWrapper>
        {provider.provider === 'vimeo' ? (
          <VideoIframe
            src={`//player.vimeo.com/video/${provider.id}?title=0&byline=0`}
            title="Video"
          />
        ) : (
          <VideoIframe
            src={`https://www.youtube.com/embed/${provider.id}`}
            title="Video"
            allowFullScreen
          />
        )}
      </VideoWrapper>
    )
  }
}

export default BlockVideo
