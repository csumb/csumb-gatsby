import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colors } from '../../../style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

const CollapsibleIcon = styled.span`
  display: inline-block;
  max-width: 1rem;
  font-size: 1.2rem;
  margin-right: 0.8rem;
`

const CollapsibleHeading = styled.button`
  background: transparent;
  border: none;
  display: block;
  width: 100%;
  text-align: left;
  cursor: pointer;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid ${colors.muted.mid};
`

const CollapsibleTextWrapper = styled.span`
  padding-right: 1.5rem;
`

const BlockHeading = ({
  level,
  url,
  text,
  uuid,
  collapsible,
  headerHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  let HeadingTag = styled(`h${level}`)``
  return (
    <HeadingTag id={`heading-${uuid}`} collapsible={collapsible}>
      {collapsible ? (
        <CollapsibleHeading
          onClick={() => {
            headerHandler()
            setIsOpen(!isOpen)
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

export default BlockHeading
