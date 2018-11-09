import React from 'react'
import styled from 'react-emotion'
import LinkInspect from 'components/link-inspect'
import { ContainerContext } from './container-context'

class BlockHeading extends React.Component {
  render() {
    let HeadingTag = styled(`h${this.props.level}`)`
      ${props => props.container};
    `
    const { url, text, uuid } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <HeadingTag id={`heading-${uuid}`} container={container}>
            {url ? <LinkInspect to={url}>{text}</LinkInspect> : <>{text}</>}
          </HeadingTag>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockHeading
