import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import SiteHeader from 'components/header/site-header'
import PageTitle from 'components/header/page-title'
import {
  ScheduleList,
  ScheduleListItem,
  ScheduleTermList,
  GEList,
} from 'components/pages/schedule'

class ScheduleFront extends React.Component {
  render() {
    const { term, termSubjects, allGe, allTerms } = this.props.pageContext
    return (
      <Layout>
        <SiteHeader path="/schedule">Class Schedule</SiteHeader>
        <Container topPadding>
          <PageTitle>{term.DESCR} Schedule</PageTitle>
          <ScheduleTermList terms={allTerms} currentTerm={term} />
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
              <h2>Subjects</h2>
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
              <h2>General Education</h2>
              <GEList term={term} type="ge" ge={allGe} />
              <h2>University Requirements</h2>
              <GEList term={term} type="ur" ge={allGe} />
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default ScheduleFront
