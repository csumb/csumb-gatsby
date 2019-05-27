import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/layouts/sections/header/page-title'
import Container from 'components/common/container'
import { Flex, Box } from 'components/common/grid'
import { UserContext } from 'components/contexts/user'
import { LinkyButton, ButtonLink } from 'components/common/button'

import Loading from 'components/common/loading'
import { LeadParagraph } from 'components/common/type'
import {
  AccountGroup,
  AccountTitle,
  AccountSidebar,
} from 'components/pages/account'

const AccountLaundryPage = () => (
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
              <Flex>
                <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                  <AccountSidebar active="account" user={context.user} />
                </Box>
                <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                  {context.user.anonymous ? (
                    <h3>You must be logged in first.</h3>
                  ) : (
                    <>
                      <AccountTitle>On-campus laundry</AccountTitle>
                      <LeadParagraph>
                        Laundry machines are only available for students in
                        on-campus housing.
                      </LeadParagraph>
                      <AccountGroup legend="Text or email alerts">
                        <p>Get notified when your laundry is ready.</p>
                        <ButtonLink to="https://www.laundryalert.com/cgi-bin/csumb721/LMNotify?CallingPage=LMPage&Type=1&Halls=0">
                          Text or email alerts
                        </ButtonLink>
                      </AccountGroup>
                      <LaundryInformation />
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

class LaundryInformation extends Component {
  state = {
    selectedHall: false,
    halls: false,
  }

  componentDidMount() {
    this.loadHallData()
  }

  loadHallData() {
    fetch('/cloud-functions/laundry')
      .then(response => {
        return response.json()
      })
      .then(halls => {
        this.setState({
          halls: halls,
        })
      })
    setTimeout(() => {
      this.loadHallData()
    }, 15000)
  }

  render() {
    const { halls } = this.state
    if (this.state.selectedHall) {
      return (
        <HallMachines
          returnToHalls={() => {
            this.setState({
              selectedHall: false,
            })
          }}
          hall={this.state.selectedHall}
        />
      )
    }
    return (
      <AccountGroup legend="Residence halls">
        {halls ? (
          <table>
            <thead>
              <tr>
                <th>Residence hall</th>
                <th>Washers</th>
                <th>Driers</th>
              </tr>
            </thead>
            <tbody>
              {halls.map(hall => (
                <tr>
                  <td>
                    <LinkyButton
                      onClick={event => {
                        event.preventDefault()
                        this.setState({
                          selectedHall: hall,
                        })
                      }}
                    >
                      {hall.name}
                    </LinkyButton>
                  </td>
                  <td>
                    <div>{hall.washers.available} available</div>
                    {hall.washers.inUse} in use
                  </td>
                  <td>
                    <div>{hall.driers.available} available</div>
                    {hall.driers.inUse} in use
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loading />
        )}
      </AccountGroup>
    )
  }
}

class HallMachines extends Component {
  state = {
    machines: false,
  }

  componentDidMount() {
    this.fetchMachines()
  }

  fetchMachines() {
    const { hall } = this.props
    fetch(hall.lookup)
      .then(response => {
        return response.json()
      })
      .then(machines => {
        this.setState({
          machines: machines,
        })
      })
    setTimeout(() => {
      this.fetchMachines()
    }, 15000)
  }

  render() {
    const { machines } = this.state
    const { hall, returnToHalls } = this.props
    return (
      <AccountGroup legend={hall.name}>
        <LinkyButton
          style={{ float: 'right' }}
          onClick={event => {
            event.preventDefault()
            returnToHalls()
          }}
        >
          Return to halls
        </LinkyButton>
        {machines ? (
          <table>
            <thead>
              <tr>
                <th>Number</th>
                <th>Type</th>
                <th>Status</th>
                <th>Time remaining</th>
              </tr>
            </thead>
            <tbody>
              {machines.map(machine => (
                <tr>
                  <th>{machine.number}</th>
                  <td>{machine.type}</td>
                  <td>{machine.status}</td>
                  <td>{machine.timeRemaining}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loading />
        )}
      </AccountGroup>
    )
  }
}

export default AccountLaundryPage
