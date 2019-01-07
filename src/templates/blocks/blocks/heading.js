import React from 'react'
import styled from 'react-emotion'
import LinkInspect from 'components/link-inspect'
import { ContainerContext, ContainerElement } from '../container-context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Chevron = styled(FontAwesomeIcon)`
  display: inline-block;
  float: right;
`

class BlockHeading extends React.Component {
  render() {
    let HeadingTag = styled(`h${this.props.level}`)``
    const { url, text, uuid, collapsible } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <HeadingTag id={`heading-${uuid}`}>
              {collapsible ? (
                <>
                  {text}
                  <Chevron icon={faChevronDown} />
                </>
              ) : (
                  <>
                    {url ? <LinkInspect to={url}>{text}</LinkInspect> : <>{text}</>}
                  </>
                )}

            </HeadingTag>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockHeading
