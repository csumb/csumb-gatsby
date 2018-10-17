import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/layouts/components/footer'
import Container from '../components/container'
import Brand from '../components/layouts/components/brand'
import { css } from 'emotion'
import { Flex, Box } from '@rebass/grid/emotion'
import { headerClass } from '../components/layouts/components/header'
//import Link from 'gatsby-link'

const dashboardCard = css`
  background: #fff;
  padding: 1rem;
`

const DashboardPage = () => (
  <div>
    <Helmet>
      <title>Dashboard | Cal State Monterey Bay</title>
    </Helmet>
    <header className={headerClass}>
      <Container>
        <Brand/>
      </Container>
    </header>
    <div className={css`
      background: #000;
    `}>
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
    </div>
    <Footer/>
  </div>
)

export default DashboardPage
