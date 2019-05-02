import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

const CollapsibleIcon = styled('span')`
  display: inline-block;
  max-width: 1rem;
  font-size: 1.2rem;
  margin-right: 0.8rem;
`

const CollapsibleHeading = styled('button')`
  background: transparent;
  border: none;
  display: block;
  width: 100%;
  text-align: left;
  cursor: pointer;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid ${colors.muted.mid};
`

const CollapsibleTextWrapper = styled('span')`
  padding-right: 1.5rem;
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
      <HeadingTag id={`heading-${uuid}`} collapsible={collapsible}>
        {collapsible ? (
          <CollapsibleHeading
            onClick={() => {
              headerHandler()
              this.handleToggle()
            }}
          >
            <CollapsibleIcon>
              <FontAwesomeIcon
                size="1x"
                icon={isOpen ? faChevronDown : faChevronRight}
              />
            </CollapsibleIcon>
            <CollapsibleTextWrapper>{text}</CollapsibleTextWrapper>
          </CollapsibleHeading>
        ) : (
          <>{url ? <a href={url}>{text}</a> : <>{text}</>}</>
        )}
      </HeadingTag>
    )
  }
}

export default BlockHeading
