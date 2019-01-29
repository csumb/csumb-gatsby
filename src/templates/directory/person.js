import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import PageTitle from 'components/header/page-title'
import { Flex, Box } from '@rebass/grid/emotion'
import styled from '@emotion/styled'

const DirectoryTitle = styled('div')`
  font-size: 1.5rem;
  font-weight: 700;
`

const DirectoryPosition = styled('div')`
  margin-bottom: 1.5rem;
`

class BuildingTemplate extends React.Component {
  render() {
    const { user } = this.props.pageContext
    return (
      <Layout pageTitle={`${user.firstName} ${user.lastName} Directory`}>
        <SiteHeader path="/directory">Directory</SiteHeader>
        <Container>
          <PageTitle>
            {user.firstName} {user.lastName}
          </PageTitle>
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 2, 1 / 2]}>
              {user.directoryDepartment.map((department, key) => (
                <DirectoryPosition key={key}>
                  <DirectoryTitle>{user.directoryTitle[key]}</DirectoryTitle>
                  {department}
                </DirectoryPosition>
              ))}
              <h2>Contact information</h2>
              <p>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>
              {user.directoryPhone && <p>{user.directoryPhone}</p>}
            </Box>
            <Box width={[1, 1, 1 / 2, 1 / 2]}>
              {user.directoryPhoto && <img src={user.directoryPhoto} alt="" />}
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default BuildingTemplate
