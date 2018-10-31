import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import User from 'components/user'
import Link from 'gatsby-link'
import {
  AccountGroup,
  AccountTitle,
  AccountData,
  AccountSidebar,
} from 'components/account'
import Button from 'components/button'

class AccountProfilePage extends React.Component {
  render() {
    return (
      <User>
        {user => (
          <>
            {user && (
              <Layout pageTitle="Your profile">
                <Container>
                  <PageTitle>
                    {user === 'anonymous' ? (
                      <h3>Your profile</h3>
                    ) : (
                      <>
                        {user.profile.firstName} {user.profile.lastName}
                      </>
                    )}
                  </PageTitle>
                  <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                      <AccountSidebar active="profile" user={user} />
                    </Box>
                    <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                      {user === 'anonymous' ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <AccountTitle>Your public profile</AccountTitle>
                          <UserAccountProfileForm user={user} />
                        </>
                      )}
                    </Box>
                  </Flex>
                </Container>
              </Layout>
            )}
          </>
        )}
      </User>
    )
  }
}

class UserAccountProfileForm extends React.Component {
  render() {
    const user = this.props.user
    return (
      <>
        <p>hi</p>
      </>
    )
  }
}

export default AccountProfilePage
