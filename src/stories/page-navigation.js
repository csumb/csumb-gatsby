import React from 'react'
import { storiesOf } from '@storybook/react'
import PageNavigation from 'components/navigation/page'
import typography from 'utils/typography'

typography.injectStyles()

const navigation = [
  { name: 'Choose a wholly unsubstantial instance', url: '/one/' },
  { name: 'Followed by the gaudiest', url: '/one/' },
  { name: 'Dint of much wriggling,', url: '/one/' },
  { name: 'Hhis only answer was a snore', url: '/one/' },
  { name: 'Seeing Queequeg’s pagan arm', url: '/one/' },
]

storiesOf('Page navigation', module).add(
  'Sidebar',
  () => <PageNavigation navigation={navigation} />,
  {
    info: 'Used for tertiary navigation on the side of a pge',
  }
)
