import React from 'react'
import styled from 'react-emotion'
import LinkInspect from 'components/link-inspect'
import { ContainerContext, ContainerElement } from '../container-context'

class BlockHeading extends React.Component {
  render() {
    let HeadingTag = styled(`h${this.props.level}`)``
    const { url, text, uuid } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <HeadingTag id={`heading-${uuid}`}>
              {url ? <LinkInspect to={url}>{text}</LinkInspect> : <>{text}</>}
            </HeadingTag>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockHeading
