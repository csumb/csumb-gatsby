import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/navigation/site'
import Well from 'components/well'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import { LinkyButton } from 'components/button'
import { Flex, Box } from '@rebass/grid/emotion'
import PageTitle from 'components/header/page-title'

const allServicesPageId = 21910

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

const Letter = styled('a')`
  display: inline-block;
  margin-right: 0.5rem;
`

const PageListItem = styled('div')`
  margin: 0.5rem 0;
`

const PageListBox = styled(Box)`
  border-right: 1px solid ${colors.muted.light};
`

class UniversityPersonnelServicesPage extends React.Component {
  state = {
    expanded: [],
  }

  render() {
    const { data } = this.props
    return (
      <Layout pageTitle="University Personnel">
        <SiteHeader path="/up">University Personnel</SiteHeader>
        {data.allCsumbNavigation && (
          <SiteNavigation
            navigation={data.allCsumbNavigation.edges[0].node.navigation}
          />
        )}
        <Container>
          <PageTitle>Index</PageTitle>
          <Well>
            {alphabet.map(letter => (
              <Letter href={`#letter-${letter}`}>{letter.toUpperCase()}</Letter>
            ))}
          </Well>
          <Flex flexWrap="wrap">
            <PageListBox width={[1, 1 / 4]} pr={[0, 4]}>
              {data.allAirtable.edges.map(page => (
                <>
                  {page.node.data.Parent && (
                    <>
                      {page.node.data.Parent.map(parent => (
                        <>
                          {parent.node.data.Page_ID === allServicesPageId && (
                            <PageListItem>
                              <h4>
                                <LinkyButton>{page.node.data.Name}</LinkyButton>
                              </h4>
                            </PageListItem>
                          )}
                        </>
                      ))}
                    </>
                  )}
                </>
              ))}
            </PageListBox>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default UniversityPersonnelServicesPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "up" } }) {
      edges {
        node {
          navigation
        }
      }
    }

    allAirtable(
      filter: { queryName: { in: ["UniversityPersonnelPages"] } }
      sort: { fields: [data___Name] }
    ) {
      edges {
        node {
          id
          table
          recordId
          data {
            Name
            Notes
            Page_ID
            Link
            Parent {
              id
              data {
                Page_ID
                Name
                Notes
                Link
              }
            }
          }
        }
      }
    }
  }
`
