import React from 'react'
import renderer from 'react-test-renderer'
import {
  Label,
  Submit,
  Fieldset,
  InputText,
  InputTextarea,
  InputCheckbox,
  InputRadio,
  InputSelect,
} from 'components/common/forms'

describe('Label', () => {
  it('renders labels correctly', () => {
    const tree = renderer
      .create(
        <Label labelId="label" isRequired={true}>
          A form label
        </Label>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders hidden labels correctly', () => {
    const tree = renderer
      .create(
        <Label labelId="label" isHidden={true}>
          A form label
        </Label>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('InputText', () => {
  it('renders text input correctly', () => {
    const tree = renderer
      .create(<InputText name="text" label="Text input" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders required text input correctly', () => {
    const tree = renderer
      .create(<InputText name="text" label="Text input" isRequired={true} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders inline text input correctly', () => {
    const tree = renderer
      .create(<InputText name="text" label="Text input" inline={true} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders huge text input correctly', () => {
    const tree = renderer
      .create(<InputText name="text" label="Text input" huge />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders small text input correctly', () => {
    const tree = renderer
      .create(<InputText name="text" label="Text input" small />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders small text placeholders correctly', () => {
    const tree = renderer
      .create(
        <InputText name="text" label="Text input" placeholder="placeholder" />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders hidden labels correctly', () => {
    const tree = renderer
      .create(<InputText name="text" label="Text input" hideLabel={true} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('InputTextarea', () => {
  it('renders text input correctly', () => {
    const tree = renderer
      .create(<InputTextarea name="text" label="Text input" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders required text input correctly', () => {
    const tree = renderer
      .create(
        <InputTextarea name="text" label="Text input" isRequired={true} />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders small text input correctly', () => {
    const tree = renderer
      .create(<InputTextarea name="text" label="Text input" small />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders hidden labels correctly', () => {
    const tree = renderer
      .create(<InputTextarea name="text" label="Text input" hideLabel={true} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Submit', () => {
  it('renders submit buttons correctly', () => {
    const tree = renderer.create(<Submit value="Submit" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders marginless buttons correctly', () => {
    const tree = renderer.create(<Submit value="Submit" nomargin />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders huge buttons correctly', () => {
    const tree = renderer.create(<Submit value="Submit" huge />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Fieldset', () => {
  it('renders fieldsets correctly', () => {
    const tree = renderer
      .create(<Fieldset legend="This is the legend">Some content</Fieldset>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('InputCheckbox', () => {
  it('renders checkboxes correctly', () => {
    const tree = renderer
      .create(<InputCheckbox name="checkbox" label="Checkbox input" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders required checkboxes correctly', () => {
    const tree = renderer
      .create(
        <InputCheckbox
          name="checkbox"
          label="Checkbox input"
          isRequired={true}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders checkboxes with preset values correctly', () => {
    const tree = renderer
      .create(
        <InputCheckbox
          name="checkbox"
          label="Checkbox input"
          checked="checked"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('InputRadio', () => {
  it('renders radios correctly', () => {
    const tree = renderer
      .create(
        <>
          <InputRadio name="radio" label="Radio input" name="radio" />
          <InputRadio name="radio" label="Radio input2" name="radio" />
        </>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders required radios correctly', () => {
    const tree = renderer
      .create(<InputRadio name="radio" label="Radio input" isRequired={true} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders radios with preset values correctly', () => {
    const tree = renderer
      .create(<InputRadio name="radio" label="Radio input" checked="checked" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

const sampleSelect = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

describe('InputSelect', () => {
  it('renders selects correctly', () => {
    const tree = renderer
      .create(
        <InputSelect
          name="select"
          label="Select input"
          options={sampleSelect}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders required selects correctly', () => {
    const tree = renderer
      .create(
        <InputSelect
          name="select"
          label="Select input"
          options={sampleSelect}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders huge selects correctly', () => {
    const tree = renderer
      .create(
        <InputSelect
          name="select"
          huge
          label="Select input"
          options={sampleSelect}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
