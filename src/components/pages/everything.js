import React from 'react'
import styled from '@emotion/styled'
import { colors, fonts } from 'components/styles/theme'
import { Box } from '@rebass/grid/emotion'
import LinkInspect from 'components/link-inspect'
import Link from 'gatsby-link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const TopLevelBox = styled(Box)`
  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    font-family: ${fonts.sansSerif};
  }
  margin-bottom: 1rem;
`

const TopLevelList = styled('ul')`
  border-right: 1px solid ${colors.muted.dark};
  margin: 0;
  list-style-type: none;
`
const TopLevelItem = styled('li')`
  margin: 0;
  padding: 0;
`

const TopLevelItemLink = styled(Link)`
  color: ${colors.primary.dark};
  display: block;
  width: 100%;
  padding: 0.5rem;
  text-decoration: none;
  ${props =>
    props.isActive &&
    `background: ${colors.primary.dark};
    color: ${colors.white} !important;`};
`

const SecondLevelList = styled('ul')`
  list-style-type: none;
  margin: 0;
`

const SecondLevelTitle = styled('h2')`
  font-family: ${fonts.sansSerif};
  margin-bottom: 0;
`

const SubItem = styled('li')`
  padding: 0.5rem;
  &:hover {
    background: ${colors.primary.lightest};
  }
  h3 {
    margin: 0;
    color: ${colors.primary.dark};
    font-family: ${fonts.sansSerif};
  }
  p {
    margin: 0;
  }
`

const SubItemArrowElement = styled(FontAwesomeIcon)`
  float: right;
`

const SubItemArrow = () => <SubItemArrowElement icon={faChevronRight} />

const HiddenButton = styled('button')`
  cursor: pointer;
  padding: 0;
  border: 0;
  background: transparent;
  display: block;
  width: 100%;
  text-align: left;
`

const HiddenLink = styled(LinkInspect)`
  text-decoration: none;
  p {
    color: ${colors.black};
  }
`

const ThirdLevelList = styled('ul')`
  margin: 0;
  list-style-type: none;
`

const ThirdLevelTitle = styled('h2')`
  font-family: ${fonts.sansSerif};
  margin: 0;
`

const EverythingContent = ({ item }) => {
  if (!item.childContentfulNavigationItemDescriptionTextNode) {
    return null
  }
  return (
    <p
      dangerouslySetInnerHTML={{
        __html:
          item.childContentfulNavigationItemDescriptionTextNode
            .childMarkdownRemark.html,
      }}
    />
  )
}

const SubItemContent = ({ item }) => (
  <>
    <h3>{item.title}</h3>
    {item.childContentfulNavigationItemDescriptionTextNode && (
      <p
        dangerouslySetInnerHTML={{
          __html:
            item.childContentfulNavigationItemDescriptionTextNode
              .childMarkdownRemark.html,
        }}
      />
    )}
  </>
)

export {
  TopLevelBox,
  TopLevelList,
  TopLevelItem,
  TopLevelItemLink,
  SecondLevelList,
  SecondLevelTitle,
  EverythingContent,
  SubItem,
  SubItemContent,
  HiddenButton,
  HiddenLink,
  ThirdLevelList,
  ThirdLevelTitle,
  SubItemArrow,
}
