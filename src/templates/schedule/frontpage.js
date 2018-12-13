import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import SiteHeader from 'components/site-header'
import PageTitle from 'components/page-title'
import {
  ScheduleList,
  ScheduleListItem,
  GEList,
  GEListItem,
} from 'components/schedule'

class ScheduleFront extends React.Component {
  render() {
    const { term, termSubjects, allGe } = this.props.pageContext
    return (
      <Layout>
        <SiteHeader path="/schedule">Class Schedule</SiteHeader>
        <Container topPadding>
          <PageTitle>{term.DESCR} Schedule</PageTitle>
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
              <h3>Subjects</h3>
              <ScheduleList>
                {termSubjects.map(subject => (
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
                {allGe.map(ge => (
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
