import React from 'react'
import Container from '../components/container'
import Layout from '../components/layouts/default'
import { css } from 'emotion'
import { Flex, Box } from '@rebass/grid/emotion'
//import Link from 'gatsby-link'

const dashboardCard = css`
  background: #fff;
  padding: 1rem;
`

const DashboardPage = () => (
  <Layout pageTitle="Dashboard">
    <Container>
      <Flex flexWrap="wrap">
        <Box width={[ 1, 1, 1/2, 1/2 ]} px={2} className={dashboardCard}>
          sta
        </Box>
        <Box width={[ 1, 1, 1/2, 1/2 ]} px={2} className={dashboardCard}>
          we
        </Box>
        
      </Flex>
    </Container>
  </Layout>
)

export default DashboardPage
