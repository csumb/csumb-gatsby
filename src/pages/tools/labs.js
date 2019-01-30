import React from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import PageTitle from 'components/header/page-title'
import Container from 'components/container'
import { Lab } from 'components/pages/labs'
import { Flex, Box } from '@rebass/grid'
import { AlertFyi } from 'components/alert'

class LabsPage extends React.Component {
  render() {
    const { labs, customerId } = this.props.data.site.siteMetadata.labs
    return (
      <Layout pageTitle={'Campus Computer Labs'}>
        <Container>
          <PageTitle>Computer Labs</PageTitle>
          <AlertFyi>
            Cinematic Arts labs are only avaialble for Cinematic Arts students,
            and may require special training.
          </AlertFyi>
          <Flex flexWrap="wrap">
            {labs.map(lab => (
              <Box width={[1, 1 / 2, 1 / 2]} px={2}>
                <Lab lab={lab} customerId={customerId} />
              </Box>
            ))}
          </Flex>
        </Container>
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
