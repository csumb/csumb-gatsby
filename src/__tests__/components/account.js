import React from 'react'
import renderer from 'react-test-renderer'
import {
  AccountSidebar,
  AccountTitle,
  AccountData,
  AccountGroup,
} from 'components/pages/account'

const profile = {
  firstName: 'Joe',
  lastName: 'Otter',
}

const staffUser = {
  _isEmployee: true,
  profile: profile,
}

const applicantUser = {
  _isApplicant: true,
  profile: profile,
}

describe('AccountSidebar', () => {
  it('renders the sidebar for Staff', () => {
    const tree = renderer.create(<AccountSidebar user={staffUser} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders the sidebar for Applicants', () => {
    const tree = renderer
      .create(<AccountSidebar user={applicantUser} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('AccountTitle', () => {
  it('renders account title correctly', () => {
    const tree = renderer
      .create(<AccountTitle>The title</AccountTitle>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('AccountData', () => {
  it('renders account data correctly', () => {
    const tree = renderer.create(<AccountData>Some data</AccountData>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('AccountGroup', () => {
  it('renders account data groups correctly', () => {
    const tree = renderer
      .create(<AccountGroup legend="This is a legend">Some data</AccountGroup>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
