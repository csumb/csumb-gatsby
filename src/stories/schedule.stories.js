import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, ButtonLink } from 'components/button'
import typography from 'utils/typography'
import {
  ScheduleList,
  ScheduleListItem,
  GEList,
  GEListItem,
} from 'components/schedule'

typography.injectStyles()

storiesOf('Schedule', module)
  .add('About', () => (
    <p>The schedule of classes has a number of custom components.</p>
  ))
  .add('Schedule List', () => (
    <ScheduleList>
      <ScheduleListItem subject="BIO" to="/schedule/bio">
        Biology
      </ScheduleListItem>
      <ScheduleListItem subject="HCOM" to="/schedule/bio">
        Humanities &amp; Communication
      </ScheduleListItem>
    </ScheduleList>
  ))
  .add('GeneralEducation List', () => (
    <GEList>
      <GEListItem to="/schedule">
        A1: Oral &amp; Written Communication
      </GEListItem>
      <GEListItem to="/schedule">B1: Physical Science</GEListItem>
    </GEList>
  ))
