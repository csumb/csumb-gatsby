import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import { ProfileGroup, ProfileTitle, ProfileSidebar } from 'components/profile'
import User from 'components/user'
import { Table, TableRow, TableHeader, TableCell } from 'components/table'
import Button from 'components/button'

class ProfileCardPage extends React.Component {
  render() {
    return (
      <User>
        {user => (
          <Layout pageTitle="Otter card">
            <Container>
              {user && (
                <>
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
                      <ProfileSidebar active="print" />
                    </Box>
                    <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                      {user === 'anonymous' ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <ProfileTitle>Otter Card</ProfileTitle>
                          <UserCardForm user={user} />
                        </>
                      )}
                    </Box>
                  </Flex>
                </>
              )}
            </Container>
          </Layout>
        )}
      </User>
    )
  }
}

class UserCardForm extends React.Component {
  state = {
    card: false,
    isReady: false,
  }

  componentDidMount() {
    if (!this.props.user) {
      return
    }
    window
      .fetch(
        `https://winservices.csumb.edu/cbord/balance.php?e=${
          this.props.user.profile.employeeNumber
        }`
      )
      .then(response => {
        return response.json()
      })
      .then(card => {
        this.setState({
          isReady: true,
          card: card,
        })
      })
      .catch(error => {
        this.setState({
          isReady: true,
        })
      })
  }

  render() {
    const { balance, error } = this.state.card
    return (
      <>
        <ProfileGroup legend="Otter Card balance">
          {!this.state.isReady && <p>Loading Otter Card balance...</p>}
          {this.state.isReady && (
            <>
              {error ? (
                <>
                  <p>There was an error reading your Otter Card.</p>
                </>
              ) : (
                <>
                  <Table>
                    <TableRow>
                      <TableHeader>Tender type</TableHeader>
                      <TableHeader>Balance</TableHeader>
                    </TableRow>
                    {Object.keys(balance).map(key => (
                      <TableRow>
                        <TableCell>{balance[key].tender}</TableCell>
                        <TableCell>{balance[key].balance}</TableCell>
                      </TableRow>
                    ))}
                  </Table>
                </>
              )}
            </>
          )}
        </ProfileGroup>
        <ProfileGroup legend="Add more meals">
          <p>You can add several kinds of pre-paid meal plans.</p>
          <Button
            to={`https://api.csumb.edu/cashnet/${
              this.props.user.profile.employeeNumber
            }/RMBRD`}
            buttonType="default"
          >
            Add more meals
          </Button>
        </ProfileGroup>
      </>
    )
  }
}

export default ProfileCardPage
