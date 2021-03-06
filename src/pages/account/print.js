import React, { Component } from 'react'
import { Layout, PageTitle } from '../../components/layouts/default'
import Container from '../../components/common/container'
import { Flex, Box } from '../../components/common/grid'
import {
  AccountGroup,
  AccountTitle,
  AccountData,
  AccountSidebar,
  AccountPlaceholder,
} from '../../components/pages/account'
import { InputText, Submit } from '../../components/common/forms'
import { UserContext } from '../../components/contexts/user'
import NProgress from 'nprogress'
import md5 from 'md5'

const pricePerPage = 0.08

class AccountPrintPage extends Component {
  render() {
    return (
      <Layout pageTitle="Print balance">
        <UserContext.Consumer>
          {context => (
            <Container>
              {context.user ? (
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
                  <Flex>
                    <Box width={[1, 1 / 4]} pr={[0, 4]}>
                      <AccountSidebar active="print" user={context.user} />
                    </Box>
                    <Box width={[1, 3 / 4]}>
                      {context.user.anonymous ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <AccountTitle>Print balance</AccountTitle>
                          <UserPrintForm user={context.user} />
                        </>
                      )}
                    </Box>
                  </Flex>
                </>
              ) : (
                <AccountPlaceholder />
              )}
            </Container>
          )}
        </UserContext.Consumer>
      </Layout>
    )
  }
}

class UserPrintForm extends Component {
  state = {
    balance: false,
    isReady: false,
  }

  componentDidMount() {
    const { user } = this.props
    if (!user) {
      return
    }
    NProgress.start()
    window
      .fetch(
        `https://winservices.csumb.edu/print/balance.php?u=${user._username}`
      )
      .then(response => {
        NProgress.inc()
        return response.json()
      })
      .then(balance => {
        NProgress.done()
        this.setState({
          isReady: true,
          balance: balance,
        })
      })
      .catch(error => {
        NProgress.done()
        this.setState({
          isReady: true,
        })
      })
  }

  render() {
    const { isReady, balance } = this.state
    const { user } = this.props
    return (
      <>
        <AccountGroup legend="Print balance">
          {!isReady && <p>Loading print balance...</p>}
          {isReady && (
            <>
              {balance.error ? (
                <>
                  <p>Your print account has not been set up.</p>
                </>
              ) : (
                <>
                  <p>You can print:</p>
                  <AccountData>{balance.pages_left} pages</AccountData>
                </>
              )}
            </>
          )}
        </AccountGroup>
        <AccountGroup legend="Buy more prints">
          {!isReady && <p>Loading print balance...</p>}
          {isReady && (
            <>
              {balance.error ? (
                <>
                  <p>Your print account has not been set up.</p>
                </>
              ) : (
                <>
                  <p>
                    Buy more prints online.{' '}
                    <strong>Each page costs {pricePerPage * 100} cents.</strong>
                  </p>
                  <AccountPrintBuyPrintsForm user={user} />
                </>
              )}
            </>
          )}
        </AccountGroup>
      </>
    )
  }
}

class AccountPrintBuyPrintsForm extends Component {
  state = {
    quantity: 0,
  }

  onChange(event) {
    this.setState({
      quantity: parseInt(event.target.value),
    })
  }

  render() {
    const { quantity } = this.state
    const { user } = this.props
    return (
      <form
        action="https://commerce.cashnet.com/csumb_ubempay?virtual="
        method="post"
        onSubmit={event => {
          window.fetch(
            `https://winservices.csumb.edu/print/addbalance.php?UserName=${
              user._username
            }&add=${(quantity * pricePerPage).toFixed(2)}&key=${md5(
              `${user._username}237sdfKJ@sd903SF`
            )}`
          )
        }}
      >
        <InputText
          label="Number of pages"
          name="pages"
          onKeyUp={this.onChange.bind(this)}
        />

        <input
          type="hidden"
          name="itemcode1"
          id="edit-itemcode1"
          value="UB-PRINT"
        />
        <input
          type="hidden"
          name="desc1"
          id="edit-desc1"
          value="Lab printer paper"
        />
        <input
          type="hidden"
          name="amount1"
          id="edit-amount1"
          value={(quantity * pricePerPage).toFixed(2)}
        />
        <input type="hidden" name="qty1" id="edit-qty1" value={quantity} />
        <input
          type="hidden"
          name="ref1type1"
          id="edit-ref1type1"
          value="NAME_G"
        />
        <input
          type="hidden"
          name="ref1val1"
          id="edit-ref1val1"
          value={`${user.profile.firstName} ${user.profile.lastName}`}
        />
        <input
          type="hidden"
          name="ref2type1"
          id="edit-ref2type1"
          value="EMAIL_G"
        />
        <input
          type="hidden"
          name="ref2val1"
          id="edit-ref22val1"
          value={user.profile.email}
        />
        <input
          type="hidden"
          name="ref3type1"
          id="edit-ref3type1"
          value="UB_ORDER_ID"
        />
        <input type="hidden" name="ref3val1" id="edit-ref3val1" value="" />

        <p>Total charge: ${(quantity * pricePerPage).toFixed(2)}</p>
        <div>
          <Submit value="Buy more pages" />
        </div>
      </form>
    )
  }
}

export default AccountPrintPage
