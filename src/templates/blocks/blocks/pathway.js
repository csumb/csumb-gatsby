import React from 'react'
import styled from 'react-emotion'
import { colors } from 'components/styles/theme'
import bp from 'components/styles/breakpoints'
import { Flex, Box } from '@rebass/grid/emotion'
import { css } from 'emotion'
import { ContainerElement } from '../container-context'
import filterCourses from './filter-courses'

const PathwayLabel = styled('span')`
  ${css(
    bp({
      display: ['block', 'none'],
    })
  )};
  font-weight: 700;
`

const pathwayHeading = css(
  bp({
    display: ['none', 'block'],
  })
)

const PathwayHeading = styled(Box)`
  ${pathwayHeading}
  background: ${colors.muted.light};
`

const PathwayItem = styled(Box)``

const PathwayRow = styled(Flex)`
  border-bottom: 1px solid ${colors.muted.light};
`

class BlockPathway extends React.Component {
  render() {
    const { pathways } = this.props
    return (
      <ContainerElement isFull>
        <Flex flexWrap="wrap">
          <PathwayHeading width={[1, 1 / 3]} px={2}>
            Course
          </PathwayHeading>
          <PathwayHeading width={[1, 1 / 3]} px={2}>
            Units
          </PathwayHeading>
          <PathwayHeading width={[1, 1 / 3]} px={2}>
            Requirements
          </PathwayHeading>
        </Flex>
        {pathways.map(pathway => (
          <PathwayRow flexWrap="wrap">
            <PathwayItem width={[1, 1 / 3]} px={2}>
              <PathwayLabel>Course</PathwayLabel>
              <span
                dangerouslySetInnerHTML={{
                  __html: filterCourses(pathway.course),
                }}
              />
            </PathwayItem>
            <PathwayItem width={[1, 1 / 3]} px={2}>
              <PathwayLabel>Units</PathwayLabel>
              {pathway.units}
            </PathwayItem>
            <PathwayItem width={[1, 1 / 3]} px={2}>
              <PathwayLabel>Requirements</PathwayLabel>
              {pathway.requirements}
            </PathwayItem>
          </PathwayRow>
        ))}
      </ContainerElement>
    )
  }
}

export default BlockPathway
