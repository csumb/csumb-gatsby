import React from 'react'
import styled from 'react-emotion'
import Link from 'gatsby-link'
import theme from 'components/styles/theme'
import PropTypes from 'prop-types'

const AccountSidebarOptions = styled('ul')`
  list-style-type: none;
  margin: 0;
`

const AccountSidebarLink = styled(Link)`
  display: block;
  padding: 0.5rem;
  border-bottom: 1px solid ${theme.colors.black};
  ${props =>
    props.active
      ? `background: ${theme.colors.primary.dark};
    color: ${theme.colors.white} !important;`
      : `color: ${theme.colors.primary.dark};`};
`

const AccountTitle = styled('h2')`
  margin-top: 0;
`

const AccountData = styled('p')`
  font-size: 1.4rem;
  font-weight: bold;
  margin-left: 1rem;
`

const AccountSidebar = props => (
  <AccountSidebarOptions>
    <AccountSidebarLink to="/account" active={props.active === 'account'}>
      Your account
    </AccountSidebarLink>
    {props.user._isEmployee && (
      <AccountSidebarLink
        to="/account/profile"
        active={props.active === 'profile'}
      >
        Your public profile
      </AccountSidebarLink>
    )}
    <AccountSidebarLink to="/account/card" active={props.active === 'card'}>
      Otter Card
    </AccountSidebarLink>
    <AccountSidebarLink to="/account/print" active={props.active === 'print'}>
      Printer paper
    </AccountSidebarLink>
  </AccountSidebarOptions>
)

const AccountGroupWrapper = styled('div')`
  border: 1px solid ${theme.colors.gray.light};
  padding: 1rem;
  margin-bottom: 1rem;
`

const AccountGroupLegend = styled('h3')`
  font-size: 1.5rem;
`

const AccountGroup = props => (
  <AccountGroupWrapper>
    <AccountGroupLegend>{props.legend}</AccountGroupLegend>
    {props.children}
  </AccountGroupWrapper>
)

AccountGroup.propTypes = {
  legend: PropTypes.string.isRequired,
}

export { AccountSidebar, AccountTitle, AccountData, AccountGroup }
