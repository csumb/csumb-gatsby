import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import PageTitle from 'components/layouts/sections/header/page-title'
import Container from 'components/common/container'
import { Lab, LabKey } from 'components/pages/labs'
import { Flex, Box } from '@rebass/grid/emotion'
import { AlertFyi } from 'components/common/alert'
import { UserContext } from 'components/contexts/user'
import { AccountSidebar, AccountTitle } from 'components/pages/account'

class LabsPage extends Component {
  render() {
    const { labs, customerId } = this.props.data.site.siteMetadata.labs
    return (
      <Layout pageTitle="Computer labs">
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
                      <AccountTitle>Computer labs</AccountTitle>
                      <AlertFyi>
                        Cinematic Arts labs are only avaialble for Cinematic
                        Arts students, and may require special training.
                      </AlertFyi>
                      <LabKey />
                      <Flex flexWrap="wrap">
                        {labs.map(lab => (
                          <Box width={[1, 1 / 2, 1 / 2]} px={2}>
                            <Lab lab={lab} customerId={customerId} />
                          </Box>
                        ))}
                      </Flex>
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

export default LabsPage

export const query = graphql`
  {
    site {
      siteMetadata {
        labs {
          labs
          customerId
        }
      }
    }
  }
`
