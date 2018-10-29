import React from 'react'
import styled from 'react-emotion'
import Link from 'gatsby-link'
import theme from 'components/styles/theme'
import PropTypes from 'prop-types'

const ProfileSidebarOptions = styled('ul')`
  list-style-type: none;
  margin: 0;
`

const ProfileSidebarLink = styled(Link)`
  display: block;
  padding: 0.5rem;
  border-bottom: 1px solid ${theme.colors.black};
  ${props =>
    props.active
      ? `background: ${theme.colors.primary.dark};
    color: ${theme.colors.white} !important;`
      : `color: ${theme.colors.primary.dark};`};
`

const ProfileTitle = styled('h2')`
  margin-top: 0;
`

const ProfileData = styled('p')`
  font-size: 1.4rem;
  font-weight: bold;
  margin-left: 1rem;
`

const ProfileSidebar = props => (
  <ProfileSidebarOptions>
    <ProfileSidebarLink to="/profile" active={props.active === 'profile'}>
      Your profile
    </ProfileSidebarLink>
    <ProfileSidebarLink to="/profile/print" active={props.active === 'print'}>
      Printer paper
    </ProfileSidebarLink>
    <ProfileSidebarLink
      to="/profile/ottercard"
      active={props.active === 'ottercard'}
    >
      Otter Card
    </ProfileSidebarLink>
  </ProfileSidebarOptions>
)

const ProfileGroupWrapper = styled('div')`
  border: 1px solid ${theme.colors.gray.light};
  padding: 1rem;
  margin-bottom: 1rem;
`

const ProfileGroupLegend = styled('h3')`
  font-size: 1.5rem;
`

const ProfileGroup = props => (
  <ProfileGroupWrapper>
    <ProfileGroupLegend>{props.legend}</ProfileGroupLegend>
    {props.children}
  </ProfileGroupWrapper>
)

ProfileGroup.propTypes = {
  legend: PropTypes.string.isRequired,
}

export { ProfileSidebar, ProfileTitle, ProfileData, ProfileGroup }
