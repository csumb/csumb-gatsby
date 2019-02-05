import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/header/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import {
  AccountGroup,
  AccountTitle,
  AccountSidebar,
} from 'components/pages/account'
import { UserContext } from 'components/contexts/user'
import { Table, TableRow, TableHeader, TableCell } from 'components/table'
import { ButtonLink } from 'components/button'

class AccountCardPage extends React.Component {
  render() {
    return (
      <Layout pageTitle="Otter card">
        <UserContext.Consumer>
          {context => (
            <Container>
              {context.user && (
                <>
                  <PageTitle>
                    {context.user.anonymous ? (
                      <h3>Your profile</h3>
                    ) : (
                      <>
                        {context.user.profile.firstName}{' '}
                        {context.user.profile.lastName}
                      </>
                    )}
                  </PageTitle>
                  <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                      <AccountSidebar active="card" user={context.user} />
                    </Box>
                    <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                      {context.user.anonymous ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <AccountTitle>Otter Card</AccountTitle>
                          <UserCardForm user={context.user} />
                        </>
                      )}
                    </Box>
                  </Flex>
                </>
              )}
            </Container>
          )}
        </UserContext.Consumer>
      </Layout>
    )
  }
}

class UserCardForm extends React.Component {
  state = {
    card: false,
    isReady: false,
  }

  componentDidMount() {
    const { user } = this.props
    if (!user) {
      return
    }
    fetch(
      `https://winservices.csumb.edu/cbord/balance.php?e=${
        user.profile.employeeNumber
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
    const { isReady } = this.state
    const { user } = this.props
    return (
      <>
        <AccountGroup legend="Otter Card balance">
          {!isReady && <p>Loading Otter Card balance...</p>}
          {isReady && (
            <>
              {error ? (
                <>
                  <p>There was an error reading your Otter Card.</p>
                </>
              ) : (
                <>
                  <Table>
                    <thead>
                      <TableRow>
                        <TableHeader>Tender type</TableHeader>
                        <TableHeader>Balance</TableHeader>
                      </TableRow>
                    </thead>
                    <tbody>
                      {Object.keys(balance).map(key => (
                        <TableRow key={key}>
                          <TableCell>{balance[key].tender}</TableCell>
                          <TableCell>{balance[key].balance}</TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
            </>
          )}
        </AccountGroup>
        <AccountGroup legend="Add more meals">
          <p>You can add several kinds of pre-paid meal plans.</p>
          <p>
            <ButtonLink
              to={`https://api.csumb.edu/cashnet/${
                user.profile.employeeNumber
              }/RMBRD`}
              buttonType="default"
            >
              Add more meals
            </ButtonLink>
          </p>
        </AccountGroup>
        <AccountGroup legend="Upload OtterCard photo">
          <p>Upload a photo for your new OtterCard.</p>
          <p>
            <ButtonLink to="/account/card/upload" buttonType="default">
              Upload photo
            </ButtonLink>
          </p>
        </AccountGroup>
      </>
    )
  }
}

export default AccountCardPage
