import React from 'react'
import styled from '@emotion/styled'
import LinkInspect from 'components/link-inspect'
import { colors } from 'style/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

const CollapsibleIcon = styled(FontAwesomeIcon)`
  margin-right: 0.8rem;
  font-size: 1rem;
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
            <CollapsibleIcon
              size="1x"
              icon={isOpen ? faChevronDown : faChevronRight}
            />
            <CollapsibleTextWrapper>{text}</CollapsibleTextWrapper>
          </CollapsibleHeading>
        ) : (
          <>{url ? <LinkInspect to={url}>{text}</LinkInspect> : <>{text}</>}</>
        )}
      </HeadingTag>
    )
  }
}

export default BlockHeading
