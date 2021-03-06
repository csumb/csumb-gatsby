import React from 'react'
import styled from '@emotion/styled'
import ContentLoader from 'react-content-loader'
import LinkInspect from '../utilities/link-inspect'
import { colors } from '../../style'
import Well from '../common/well'
import PropTypes from 'prop-types'
import { Flex, Box } from '../common/grid'

const AccountSidebarOptions = styled('ul')`
  list-style-type: none;
  margin: 0;
`

const AccountSidebarLink = styled(LinkInspect)`
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
const ApplicantDashboardLink = styled('a')`
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
      <>
        <AccountSidebarLink to="/account/profile">
          Your public profile
        </AccountSidebarLink>
      </>
    )}
    {user._isApplicant && (
      <ApplicantDashboardLink href="https://csumb.okta.com/home/csumb_applicantdashboard_1/0oaqxen8h1rSRu0dK0x7/alnqxeqj9dQGDKBXP0x7">
        Your application status
      </ApplicantDashboardLink>
    )}
    <AccountSidebarLink to="/account/labs">Computer labs</AccountSidebarLink>
    <AccountSidebarLink to="https://get.cbord.com/csumb">
      Otter Card
    </AccountSidebarLink>
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

const AccountPlaceholder = ({ uniquekey }) => (
  <Flex>
    <Box width={[1, 1, 1 / 4, 1 / 4]} pr={[0, 4]}>
      <ContentLoader
        height={160}
        width={400}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
        uniquekey={`account-placeholder-${uniquekey}`}
      >
        <rect x="10" y="5" rx="4" ry="4" width="266" height="20" />
        <rect x="10" y="40" rx="4" ry="4" width="266" height="20" />
        <rect x="10" y="75" rx="4" ry="4" width="266" height="20" />
        <rect x="10" y="110" rx="4" ry="4" width="266" height="20" />
      </ContentLoader>
    </Box>
    <Box width={[1, 1, 3 / 4, 3 / 4]}>
      <ContentLoader
        height={500}
        width={500}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="10" y="4" rx="4" ry="4" width="444" height="100" />
        <rect x="10" y="120" rx="4" ry="4" width="444" height="100" />
        <rect x="10" y="240" rx="4" ry="4" width="444" height="100" />
      </ContentLoader>
    </Box>
  </Flex>
)

export {
  AccountSidebar,
  AccountTitle,
  AccountData,
  AccountGroup,
  AccountPlaceholder,
}
