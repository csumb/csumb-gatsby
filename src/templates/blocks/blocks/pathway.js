import React, { Component } from 'react'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import { Flex, Box } from 'components/common/grid'
import bp from 'style/breakpoints'

const PathwayRow = styled(Flex)`
  border-bottom: 1px solid ${colors.muted.highlight};
`

const PathwayHeader = styled(Flex)`
  background: ${colors.muted.highlight};
  ${bp({
    display: ['none', 'flex', 'flex'],
  })}
`

const PathwayHeaderItem = styled(Box)`
  padding: 1rem;
  font-weight: bold;
`

const PathwayItem = styled(Box)`
  padding: 1rem 1rem 0 1rem;
  ul {
    margin-bottom: 0;
  }
`

const MobileHeader = styled('div')`
  ${bp({
    display: ['block', 'none', 'none'],
  })};
  font-weight: bold;
`

class BlockPathway extends Component {
  render() {
    const { pathways } = this.props
    return (
      <div>
        <PathwayHeader flexWrap="wrap">
          <PathwayHeaderItem width={[1, 1 / 2]}>Course(s)</PathwayHeaderItem>
          <PathwayHeaderItem width={[1, 1 / 4]}>Units</PathwayHeaderItem>
          <PathwayHeaderItem width={[1, 1 / 4]}>Requirements</PathwayHeaderItem>
        </PathwayHeader>
        {pathways.map(pathway => (
          <PathwayRow flexWrap="wrap">
            <PathwayItem width={[1, 1 / 2]}>
              <MobileHeader>Course</MobileHeader>
              {pathway.course}
            </PathwayItem>
            <PathwayItem width={[1, 1 / 4]}>
              <MobileHeader>Units</MobileHeader>
              {pathway.units}
            </PathwayItem>
            <PathwayItem width={[1, 1 / 4]}>
              {pathway.requirements && (
                <>
                  <MobileHeader>Requirements</MobileHeader>
                  <ul>
                    {pathway.requirements.map(requirement => (
                      <li>{requirement}</li>
                    ))}
                  </ul>
                </>
              )}
            </PathwayItem>
          </PathwayRow>
        ))}
      </div>
    )
  }
}

export default BlockPathway
