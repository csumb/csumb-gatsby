import React from 'react'
import styled from '@emotion/styled'
import LinkInspect from 'components/link-inspect'
import { ContainerContext, ContainerElement } from '../container-context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const CollapsibleIcon = styled(FontAwesomeIcon)`
  float: right;
`

const CollapsibleHeading = styled('button')`
  background: transparent;
  border: none;
  padding: none;
  display: block;
  width: 100%;
  text-align: left;
  cursor: pointer;
`

class BlockHeading extends React.Component {
  state = {
    isOpen: false,
  }

  handleToggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    let HeadingTag = styled(`h${this.props.level}`)``
    const { url, text, uuid, collapsible, headerHandler } = this.props
    const { isOpen } = this.state
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <HeadingTag id={`heading-${uuid}`}>
              {collapsible ? (
                <CollapsibleHeading
                  onClick={() => {
                    headerHandler()
                    this.handleToggle()
                  }}
                >
                  <CollapsibleIcon
                    icon={isOpen ? faChevronUp : faChevronDown}
                  />
                  {text}
                </CollapsibleHeading>
              ) : (
                <>
                  {url ? (
                    <LinkInspect to={url}>{text}</LinkInspect>
                  ) : (
                    <>{text}</>
                  )}
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
