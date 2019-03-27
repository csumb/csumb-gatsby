import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/navigation/site'
import Blocks from 'templates/blocks'
import PageTitle from 'components/header/page-title'
import { Flex, Box } from '@rebass/grid/emotion'
import { ButtonLink } from 'components/button'

const UnderseaArchive = ({ data }) => {
  const regions = {}
  const MPAs = {}
  data.forEach(({ node }) => {
    if (node.table === 'MPAs') {
      MPAs[node.recordId] = node
    }
  })
  data.forEach(({ node }) => {
    if (node.table === 'Regions') {
      regions[node.recordId] = node
      regions[node.recordId]._archives = []
    }
  })
  data.forEach(({ node }) => {
    if (node.table === 'Archives') {
      node._mpas = []
      node.data.MPAs.forEach(mpaId => {
        node._mpas.push(MPAs[mpaId])
      })
      node.data.Region.forEach(regionId => {
        regions[regionId]._archives.push(node)
      })
    }
  })
  console.log(regions)

  return (
    <>
      {Object.keys(regions).map(region => (
        <>
          <h2>{regions[region].data.Name}</h2>
          <p>{regions[region].data.Subtitle}</p>
          {regions[region]._archives.map(archive => (
            <>
              <h3>{archive.data.Name}</h3>
              <Flex flexWrap="wrap">
                <Box width={[1, 1 / 4]} pr={[0, 2]}>
                  <h5>Media</h5>
                  <ul>
                    {archive.data.Media.map(media => (
                      <li key={media}>{media}</li>
                    ))}
                  </ul>
                  <h5>Source</h5>
                  <ul>
                    {archive.data.Source.map(source => (
                      <li key={source}>{source}</li>
                    ))}
                  </ul>
                </Box>
                <Box width={[1, 1 / 4]} pr={[0, 2]}>
                  <h5>MPAs explored</h5>
                  <ul>
                    {archive._mpas.map(mpa => (
                      <li key={mpa.recordId}>{mpa.data.Name}</li>
                    ))}
                  </ul>
                  {archive.data.Zip_File && (
                    <ButtonLink to={archive.data.Zip_File[0].url}>
                      Download imagery
                    </ButtonLink>
                  )}
                </Box>
              </Flex>
            </>
          ))}
        </>
      ))}
    </>
  )
}

class UnderseaImageryDatabasePage extends React.Component {
  render() {
    const { data } = this.props
    return (
      <Layout pageTitle="Imagery database">
        <SiteHeader path="/undersea ">
          California Undersea Imagery Archive
        </SiteHeader>
        {data.allCsumbNavigation && (
          <SiteNavigation
            navigation={data.allCsumbNavigation.edges[0].node.navigation}
          />
        )}
        <Container>
          <PageTitle>Imagery database</PageTitle>
          {data.allCsumbPage && (
            <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
          )}
          <UnderseaArchive data={data.allAirtable.edges} />
        </Container>
      </Layout>
    )
  }
}

export default UnderseaImageryDatabasePage

export const query = graphql`
  {
    allAirtable(
      filter: {
        queryName: {
          in: ["UnderseaRegions", "UnderseaArchives", "UnderseaMPA"]
        }
      }
      sort: { fields: [data___Name] }
    ) {
      edges {
        node {
          table
          recordId
          data {
            Name
            Subtitle
            Region
            MPAs
            Media
            Source
            Zip_File {
              url
            }
            image {
              id
            }
          }
        }
      }
    }

    allCsumbNavigation(filter: { site: { eq: "undersea" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allCsumbPage(
      filter: { pagePath: { eq: "imagery-database" }, site: { eq: "undersea" } }
    ) {
      edges {
        node {
          pageContent
          layout
        }
      }
    }
  }
`
