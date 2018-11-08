import React from 'react'
import { storiesOf } from '@storybook/react'
import Brand from 'components/layouts/components/brand'
import Applicant from 'components/layouts/components/applicant'
import typography from 'utils/typography'
import { UserContext } from 'components/contexts/user'

typography.injectStyles()

storiesOf('Header', module)
  .add('Brand', () => <Brand />)
  .add('Applicant link', () => (
    <UserContext.Provider value={{ user: true }}>
      <Applicant />
    </UserContext.Provider>
  ))
