import React from 'react'
import { storiesOf } from '@storybook/react'

import typography from 'utils/typography'
import {
  Label,
  InputText,
  InputTextarea,
  InputCheckbox,
  InputRadio,
  InputSelect,
  Fieldset,
  Submit,
} from 'components/forms'

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

storiesOf('Forms/Textarea')
  .add('Regular', () => <InputTextarea label="Textarea input" />, {
    info:
      'Any additional props are spread out to the textarea element, like `value`, etc.',
  })
  .add('Required', () => (
    <InputTextarea label="Textarea input" isRequired={true} />
  ))
  .add('Small', () => <InputTextarea label="Textarea input" small />)
  .add('Preset value', () => (
    <InputTextarea label="Textarea input" value="This is my beautiful novel." />
  ))
  .add('Hidden label', () => (
    <InputTextarea label="Textarea input" hideLabel={true} />
  ))

storiesOf('Forms/Checkbox')
  .add('Regular', () => <InputCheckbox label="Checkbox input" />, {
    info:
      'Any additional props are spread out to the input element, like `value`, etc.',
  })
  .add('Required', () => (
    <InputCheckbox label="Checkbox input" isRequired={true} />
  ))
  .add('Small', () => <InputCheckbox label="Checkbox input" small />)
  .add('Preset value', () => (
    <InputCheckbox label="Checkbox input" checked="checked" />
  ))

storiesOf('Forms/Radio')
  .add('Regular', () => <InputRadio label="Radio input" />, {
    info:
      'Any additional props are spread out to the input element, like `value`, etc.',
  })
  .add(
    'Multiple',
    () => (
      <>
        <InputRadio label="Radio input" name="radio" />
        <InputRadio label="Radio input2" name="radio" />
      </>
    ),
    {
      info:
        'Make sure to set the native `name` prop for radio buttons to work.',
    }
  )
  .add('Required', () => <InputRadio label="Radio input" isRequired={true} />)
  .add('Small', () => <InputRadio label="Radio input" small />)
  .add('Preset value', () => (
    <InputRadio label="Radio input" checked="checked" />
  ))

const SampleSelect = () => (
  <>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </>
)

storiesOf('Forms/Select')
  .add(
    'Regular',
    () => (
      <InputSelect label="Select input">
        <SampleSelect />
      </InputSelect>
    ),
    {
      info: 'You have to set the native `option` elements yourself.',
    }
  )
  .add(
    'Required',
    () => (
      <InputSelect label="Select input" isRequired={true}>
        <SampleSelect />
      </InputSelect>
    ),
    {
      info: 'You have to set the native `option` elements yourself.',
    }
  )

storiesOf('Forms/Fieldset').add(
  'Fieldset',
  () => (
    <Fieldset legend="A group of form items">
      <InputSelect label="Select input" isRequired={true}>
        <SampleSelect />
      </InputSelect>
      <InputRadio label="Radio input" name="radio" />
      <InputRadio label="Radio input2" name="radio" />
    </Fieldset>
  ),
  {
    info:
      'Used to group like form elements together. **Never embed a flex or column in a form fieldset**.',
  }
)

storiesOf('Forms/Submit Button').add('Submit Button', () => (
  <Submit value="Submit" />
))
