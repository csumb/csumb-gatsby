import React from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/page-title'
import Container from 'components/container'
import { Flex, Box } from '@rebass/grid/emotion'
import { UserContext } from 'components/contexts/user'
import Link from 'gatsby-link'
import styled from 'react-emotion'
import theme from 'components/styles/theme'
import {
  AccountGroup,
  AccountTitle,
  AccountData,
  AccountSidebar,
} from 'components/account'
import { ButtonLink } from 'components/button'

class AccountMessagesPage extends React.Component {
  render() {
    return (
      <Layout pageTitle="Your profile">
        <UserContext.Consumer>
          {context => (
            <>
              {context.user && (
                <Container>
                  <PageTitle>
                    {context.user === 'anonymous' ? (
                      <h3>Your messages</h3>
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
                      {context.user === 'anonymous' ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <AccountTitle>Your messages</AccountTitle>
                          <UserAccountMessages user={context.user} />
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

const Message = styled('div')`
  border: 1px solid ${theme.colors.gray.light};
  padding: 1rem;
  margin-bottom: 1rem;
`

class UserAccountMessages extends React.Component {
  state = {
    messages: false,
  }

  componentDidMount() {
    window
      .fetch(
        `https://csumb.edu/public/api/dashboard/messages?roles=${this.props.user.profile.cmsRole.join(
          ','
        )}`
      )
      .then(response => {
        return response.json()
      })
      .then(messages => {
        this.setState({
          messages: messages,
        })
      })
      .catch(error => {
        this.setState({
          messages: false,
        })
      })
  }

  render() {
    return (
      <>
        {!this.state.messages ? (
          <p>Loading messages...</p>
        ) : (
          <>
            {this.state.messages.map(message => (
              <Message>
                <h3>{message.headline}</h3>
                <p>{message.message}</p>
                <ButtonLink to={message.link}>Read more</ButtonLink>
              </Message>
            ))}
          </>
        )}
      </>
    )
  }
}

export default AccountMessagesPage
