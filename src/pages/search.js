import React, { Component } from 'react'
import { Layout, PageTitle } from '../components/layouts/default'
import { Flex } from '../components/common/grid'
import Container from '../components/common/container'
import styled from '@emotion/styled'
import GoogleSearch from '../components/utilities/google-search'

const Feedback = styled('p')`
  padding: 0 8px;
  font-size: 0.85rem;
`
class SearchPage extends Component {
  render() {
    return (
      <Layout pageTitle="Search">
        <Container>
          <PageTitle>Search</PageTitle>
          <Flex>
            <GoogleSearch />
            <div className="gcse-search" />
          </Flex>
          <Feedback>
            Results not what you expected?{' '}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdD1Lr509xObwDuJO-54KxRKClvyY5rViFFmbvPAxEJ5Mc4Ag/viewform">
              Leave us feedback
            </a>
          </Feedback>
        </Container>
      </Layout>
    )
  }
}

export default SearchPage
