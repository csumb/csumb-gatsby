import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, ButtonLink } from 'components/button'
import typography from 'style/typography'
import {
  ScheduleList,
  ScheduleListItem,
  GEList,
  GEListItem,
  CourseList,
  CoursePage,
} from 'components/pages/schedule'

typography.injectStyles()

const sampleTerm = {
  DESCR: '2018 Fall',
  SESSION_CODE: '1',
  TERM: '2184',
}
const sampleCourse = {
  ATTRIBUTES: 'CSLI=N, GE=B2',
  CATALOG_NBR: '204',
  CONSENT: 'N',
  CRN: '41928',
  CRSE_ID: '000123',
  DESCR:
    'An introduction to biomolecules, the structure and function of living cells, cell cycle, reproduction, evolution, and the diversity of organisms. Designed for Liberal Studies majors and science majors…',
  ENRL_MAX: '60',
  ENRL_TOT: '38',
  SECTION: '01',
  STRM: '2184',
  SUBJECT: 'BIO',
  TITLE: 'Introduction to Life Science',
  UNITS: '3',
  _meetingPattern: [
    {
      CRN: '41928',
      FRI: 'N',
      MEETING_BLDG: '053',
      MEETING_RM: 'E104',
      MEETING_TIME_END: '1900-01-01 11:50:00.0',
      MEETING_TIME_START: '1900-01-01 10:25:00.0',
      MON: 'N',
      SAT: 'N',
      SECTION: '01',
      SESSION_CODE: '1',
      STRM: '2184',
      SUN: 'N',
      THURS: 'Y',
      TUES: 'Y',
      WED: 'N',
      _building: {
        buildingName: 'Chapman Science Academic Center',
        code: '53',
      },
    },
  ],
}

storiesOf('Schedule', module)
  .add(
    'Schedule List',
    () => (
      <ScheduleList>
        <ScheduleListItem subject="BIO" to="/schedule/bio">
          Biology
        </ScheduleListItem>
        <ScheduleListItem subject="HCOM" to="/schedule/bio">
          Humanities &amp; Communication
        </ScheduleListItem>
      </ScheduleList>
    ),
    {
      info: 'Used on schedule front pages to list all available subjects.',
    }
  )
  .add(
    'GeneralEducation List',
    () => (
      <GEList>
        <GEListItem to="/schedule">
          A1: Oral &amp; Written Communication
        </GEListItem>
        <GEListItem to="/schedule">B1: Physical Science</GEListItem>
      </GEList>
    ),
    {
      info:
        'Used to list general education requirements on a schedule home page.',
    }
  )
  .add(
    'Course list',
    () => <CourseList courses={[sampleCourse]} term={sampleTerm} />,
    {
      info:
        '**Note: the variable names are dictated by the ODI extract.** Lists one or more courses, for listing courses by subject code, GE, or searches.',
    }
  )
  .add(
    'Course page',
    () => <CoursePage course={sampleCourse} term={sampleTerm} />,
    {
      info: '**Note: the variable names are dictated by the ODI extract.**',
    }
  )
