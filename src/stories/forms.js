import React from 'react'
import { storiesOf } from '@storybook/react'

import typography from 'utils/typography'
import { Label, InputText } from 'components/forms'

typography.injectStyles()

storiesOf('Forms', module)

storiesOf('Forms/Label')
  .add('Regular', () => <Label labelId="label">A form label</Label>)
  .add('Required', () => (
    <Label labelId="label" isRequired={true}>
      A form label
    </Label>
  ))
  .add('Visually hidden', () => (
    <Label labelId="label" isHidden={true}>
      A form label
    </Label>
  ))

storiesOf('Forms/Text')
  .add('Regular', () => <InputText label="Text input" />, {
    info:
      'Any additional props are spread out to the input element, like `value`, etc.',
  })
  .add('Required', () => <InputText label="Text input" isRequired={true} />)
  .add('Small', () => <InputText label="Text input" small />)
  .add('Placeholder', () => (
    <InputText label="Text input" placeholder="Placeholder" />
  ))
  .add('Hidden label', () => <InputText label="Text input" hideLabel={true} />)
