import React from 'react'
import styled from 'react-emotion'
import Link from 'gatsby-link'
import { colors } from 'components/styles/theme'
import Well from 'components/well'
import PropTypes from 'prop-types'

const AccountSidebarOptions = styled('ul')`
  list-style-type: none;
  margin: 0;
`

const AccountSidebarLink = styled(Link)`
  display: block;
  padding: 0.5rem;
  border-bottom: 1px solid ${colors.black};
  text-decoration: none;
  color: ${colors.primary.dark};
  &[aria-current='page'] {
    background: ${colors.primary.dark};
    color: ${colors.white};
  }
`

const AccountTitle = styled('h2')`
  margin-top: 0;
`

const AccountData = styled('p')`
  font-size: 1.4rem;
  font-weight: bold;
  margin-left: 1rem;
`

const AccountSidebar = ({ user }) => (
  <AccountSidebarOptions>
    <AccountSidebarLink to="/account">Your account</AccountSidebarLink>
    {user._isEmployee && (
      <AccountSidebarLink to="/account/profile">
        Your public profile
      </AccountSidebarLink>
    )}
    {user._isApplicant && (
      <AccountSidebarLink to="/account/applicant-status">
        Your application status
      </AccountSidebarLink>
    )}
    <AccountSidebarLink to="/account/card">Otter Card</AccountSidebarLink>
    <AccountSidebarLink to="/account/print">Printer paper</AccountSidebarLink>
    <AccountSidebarLink to="/account/emergency">
      Emergency alerts
    </AccountSidebarLink>
  </AccountSidebarOptions>
)

const AccountGroupLegend = styled('h3')`
  font-size: 1.5rem;
`

const AccountGroup = ({ legend, children }) => (
  <Well>
    <AccountGroupLegend>{legend}</AccountGroupLegend>
    {children}
  </Well>
)

AccountGroup.propTypes = {
  legend: PropTypes.string.isRequired,
}

export { AccountSidebar, AccountTitle, AccountData, AccountGroup }
