import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/layouts/sections/header/page-title'
import Container from 'components/common/container'
import { Flex, Box } from '@rebass/grid/emotion'
import { UserContext } from 'components/contexts/user'
import { Button } from 'components/common/button'
import Link from 'gatsby-link'
import { css } from 'emotion'
import {
  AccountGroup,
  AccountTitle,
  AccountData,
  AccountSidebar,
} from 'components/pages/account'
import { ButtonLink } from 'components/common/button'

class AccountPage extends React.Component {
  render() {
    return (
      <Layout pageTitle="Your profile">
        <UserContext.Consumer>
          {context => (
            <>
              {context.user && (
                <Container>
                  <PageTitle>
                    {context.user.anonymous ? (
                      <h3>Your account</h3>
                    ) : (
                      <>
                        {context.user.profile.firstName}{' '}
                        {context.user.profile.lastName}
                      </>
                    )}
                  </PageTitle>
                  <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                      <AccountSidebar active="account" user={context.user} />
                    </Box>
                    <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                      {context.user.anonymous ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <AccountTitle>Your account</AccountTitle>
                          <UserAccountForm user={context.user} />
                        </>
                      )}
                    </Box>
                  </Flex>
                </Container>
              )}
            </>
          )}
        </UserContext.Consumer>
      </Layout>
    )
  }
}

class UserAccountForm extends React.Component {
  render() {
    const { user } = this.props
    return (
      <>
        <AccountGroup legend="Username &amp; password">
          <p>
            Your username and password are used in every online service on
            campus, including logging into computers.
          </p>
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
              <h3>Username</h3>
              <p>Your CSUMB username is:</p>
              <AccountData>{user._username}</AccountData>
              <p>You cannot change your CSUMB username.</p>
            </Box>
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
              <h3>Password</h3>
              <ButtonLink
                to="https://csumb.okta.com/enduser/settings"
                buttonType="primary"
              >
                Change your password
              </ButtonLink>
            </Box>
          </Flex>
        </AccountGroup>
        <AccountFormAlumni user={user} />
        <AccountGroup legend="Role">
          <p>
            You may have one or many roles on campus. These determine what you
            have access to :
          </p>
          <UserAccountFormRole roles={user.profile.cmsRole} />
          <p>
            <strong>Changing your role:</strong> Your role is based on your
            employment, application, and enrollment records.
          </p>
        </AccountGroup>
        <AccountGroup legend="Name">
          <p>Your name is:</p>
          <AccountData>
            {user.profile.firstName} {user.profile.lastName}
          </AccountData>
          <p>
            <strong>Changing your name:</strong> You may have many names: a
            legal name, a nick name, or a preferred name.{' '}
            <Link to="/account/help/change-name">
              Learn how to change your name.
            </Link>
          </p>
        </AccountGroup>
        <AccountGroup legend="Email">
          {user.profile.email.search('@csumb.edu') > -1 ? (
            <>
              <p>You have an official CSUMB email address: </p>
              <AccountData>{user.profile.email}</AccountData>
              <p>
                <strong>Changing your email:</strong> You can change your email
                address by filing a ticket with IT.
              </p>
            </>
          ) : (
            <>
              <p>
                You do not have an official CSUMB email address. The email
                address we have on file is:
              </p>

              <AccountData>{user.profile.email}</AccountData>
            </>
          )}
        </AccountGroup>
        <AccountGroup legend="Secondary email">
          <p>
            Your secondary email is used in case you forget your CSUMB password
            or cannot get into your account.
          </p>
          {user.profile.secondEmail ? (
            <>
              <p>Your secondary email is: </p>
              <AccountData>{user.profile.secondEmail}</AccountData>
              <p>
                <ButtonLink
                  to="https://csumb.okta.com/enduser/settings"
                  buttonType="primary"
                  extraMargin
                >
                  Change your secondary email
                </ButtonLink>
              </p>
            </>
          ) : (
            <>
              <p>
                You do not have a secondary email set up. You should setup one
                now to make sure you are never locked out of your account.
              </p>
              <ButtonLink
                to="https://csumb.okta.com/settings"
                buttonType="primary"
              >
                Setup your secondary email
              </ButtonLink>
            </>
          )}
        </AccountGroup>
        <AccountGroup legend="Employee or student number">
          <p>Your employee or student number is:</p>
          <AccountData>{user.profile.employeeNumber}</AccountData>
          <p>This is used on some forms around campus.</p>
        </AccountGroup>
      </>
    )
  }
}

class AccountFormAlumni extends React.Component {
  render() {
    const { user } = this.props

    if (
      !(
        user.profile.cmsRole.indexOf('csumb_aa_life_member') === -1 &&
        user.profile.cmsRole.indexOf('student_graduate')
      )
    ) {
      return null
    }
    return (
      <AccountGroup legend="Join the Alumni Association">
        <p>
          You are eligible to join the{' '}
          <Link to="/alumni">CSUMB Alumni Association</Link>. Joining is free,
          and <strong>means you get to keep your CSUMB email account.</strong>
        </p>

        <p>
          All individuals with a CSUMB email address are required to comply with
          CSUMB’s{' '}
          <a href="https://csumb.edu/policy/policy-acceptable-use-computing-information-technology-resources">
            Policy on the Acceptable Use of Computing &amp; Information
            Technology Resources
          </a>{' '}
          and{' '}
          <a href="http://www.calstate.edu/icsuam/documents/Section8000.pdf">
            CSU’s Responsible Use policy
          </a>
          . Failure to comply with these policies may result in the suspension,
          deletion or termination of the CSUMB email account.
        </p>
        <Button>Sign up</Button>
      </AccountGroup>
    )
  }
}

class UserAccountFormRole extends React.Component {
  roles = {
    employee_staff: {
      name: 'Staff',
      email: true,
    },
    employee_executive: {
      name: 'The President',
      email: true,
    },
    employee_faculty: {
      name: 'Faculty',
      email: true,
    },
    poi: {
      name: 'Person of interest',
      email: false,
    },
    corporation: {
      name: 'Corporation employee',
      email: true,
    },
    employee_management: {
      name: 'Manager',
      email: true,
    },
    employee_temp_lecturer: {
      name: 'Lecturer',
      email: true,
    },
    csumb_aa_life_member: {
      name: 'Alumni',
      email: true,
    },
    student_applicant: {
      name: 'Applicant',
      email: false,
    },
    student_continuing_education: {
      name: 'Student',
      email: true,
    },
    student_graduate: {
      name: 'Graduated student',
      email: true,
    },
    student_matriculated: {
      name: 'Student',
      email: true,
    },
  }

  render() {
    let email = false
    this.props.roles.forEach(role => {
      if (typeof this.roles[role] !== 'undefined' && this.roles[role].email) {
        email = true
      }
    })
    return (
      <>
        {this.props.roles.length === 1 ? (
          <AccountData>{this.roles[this.props.roles[0]].name}</AccountData>
        ) : (
          <AccountData>
            <ul
              className={css`
                list-style-type: none;
                margin-left: 0;
              `}
            >
              {this.props.roles.map(role => (
                <React.Fragment key={role}>
                  {typeof this.roles[role] !== 'undefined' && (
                    <li>{this.roles[role].name}</li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </AccountData>
        )}
        {email ? (
          <p>You get a campus email account.</p>
        ) : (
          <p>You do not get a campus email account.</p>
        )}
      </>
    )
  }
}

export default AccountPage
