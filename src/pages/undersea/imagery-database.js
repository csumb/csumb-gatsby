import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Container from 'components/common/container'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/layouts/sections/navigation/site'
import Blocks from 'templates/blocks'
import PageTitle from 'components/layouts/sections/header/page-title'
import { Flex, Box } from 'components/common/grid'
import { ButtonLink, LinkyButton } from 'components/common/button'
import Lightbox from 'react-images'

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
      node._images = []
      if (node.data.Archive_Images) {
        node.data.Archive_Images.forEach(image => {
          if (image.thumbnails) {
            node._images.push({
              width: 1,
              height: 1,
              src: image.thumbnails.large.url,
            })
          }
        })
      }
      node.data.MPAs.forEach(mpaId => {
        node._mpas.push(MPAs[mpaId])
      })
      node.data.Region.forEach(regionId => {
        regions[regionId]._archives.push(node)
      })
    }
  })

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
                <Box width={[1, 1 / 2]}>
                  <UnderseaArchiveImages images={archive._images} />
                </Box>
              </Flex>
            </>
          ))}
        </>
      ))}
    </>
  )
}

class UnderseaArchiveImages extends Component {
  state = {
    currentImage: 0,
    lightboxIsOpen: false,
  }

  openLightbox(event, obj) {
    this.setState({
      lightboxIsOpen: true,
    })
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }
  render() {
    const { images } = this.props
    return (
      <>
        <LinkyButton onClick={this.openLightbox.bind(this)}>
          View sample images
        </LinkyButton>
        {typeof images[0] !== 'undefined' && (
          <img src={images[0].src} alt="Sample" />
        )}

        <Lightbox
          images={images}
          onClose={this.closeLightbox.bind(this)}
          onClickPrev={this.gotoPrevious.bind(this)}
          onClickNext={this.gotoNext.bind(this)}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </>
    )
  }
}

class UnderseaImageryDatabasePage extends Component {
  render() {
    const { data } = this.props
    return (
      <Layout pageTitle="Imagery database">
        <SiteHeader path="/undersea ">
          California Undersea Imagery Archive
        </SiteHeader>
        {data.allCsumbNavigation &&
          data.allCsumbNavigation.edges &&
          data.allCsumbNavigation.edges[0] && (
            <SiteNavigation
              navigation={data.allCsumbNavigation.edges[0].node.navigation}
            />
          )}
        <Container>
          <PageTitle>Imagery database</PageTitle>
          {data.allCsumbPage &&
            data.allCsumbPage.edges &&
            data.allCsumbPage.edges[0] && (
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
            Archive_Images {
              thumbnails {
                large {
                  url
                  width
                  height
                }
              }
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
