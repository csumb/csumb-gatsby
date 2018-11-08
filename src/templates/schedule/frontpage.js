import React from 'react'
import Link from 'gatsby-link'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import {
  ScheduleList,
  ScheduleListItem,
  GEList,
  GEListItem,
} from 'components/schedule'

class ScheduleFront extends React.Component {
  render() {
    const term = this.props.pageContext.term
    return (
      <Layout>
        <Container>
          <h1>{term.DESCR} Schedule</h1>
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
              <h3>Subjects</h3>
              <ScheduleList>
                {this.props.pageContext.termSubjects.map(subject => (
                  <ScheduleListItem
                    key={subject.code}
                    subject={subject.code}
                    to={`/schedule/${term.DESCR.toLowerCase().replace(
                      ' ',
                      ''
                    )}/${subject.code.toLowerCase()}`}
                  >
                    {subject.name}
                  </ScheduleListItem>
                ))}
              </ScheduleList>
            </Box>
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
              <h3>General Education</h3>
              <GEList>
                {this.props.pageContext.ge.map(ge => (
                  <GEListItem
                    key={ge.node.code}
                    to={`/schedule/${term.DESCR.toLowerCase().replace(
                      ' ',
                      ''
                    )}/ge/${ge.node.code.toLowerCase()}`}
                  >
                    {ge.node.name}
                  </GEListItem>
                ))}
              </GEList>
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default ScheduleFront
