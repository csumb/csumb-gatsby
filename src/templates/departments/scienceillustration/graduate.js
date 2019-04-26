import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Container from 'components/container'
import PageTitle from 'components/layouts/sections/header/page-title'
import { Flex, Box } from '@rebass/grid/emotion'
import { LeadParagraph } from 'components/type'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import Link from 'gatsby-link'
import SiteNavigation from 'components/layouts/sections/navigation/site'

class GraduateTemplate extends React.Component {
  state = {
    currentImage: 0,
    lightboxIsOpen: false,
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
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
    const { graduate, images, navigation } = this.props.pageContext
    const pageTitle = `${graduate.data.first_name} ${graduate.data.last_name}`
    const galleryImages = []
    images.forEach(image => {
      if (image.data.image) {
        galleryImages.push({
          width: 1,
          height: 1,
          src: image.data.image[0].url,
          caption: image.data.title,
        })
      }
    })
    return (
      <Layout pageTitle={pageTitle}>
        <SiteHeader path="/scienceillustration">
          Science Illustration
        </SiteHeader>
        {navigation && <SiteNavigation navigation={navigation} />}
        <Container>
          <PageTitle>{pageTitle}</PageTitle>
          <p>
            <Link to="/scienceillustration/graduate-gallery">
              ← Return to graduate gallery
            </Link>
          </p>
          <LeadParagraph>Class of {graduate.data.class}</LeadParagraph>
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 2]} pr={[0, 0, 2]}>
              {graduate.data.website && (
                <p>
                  <a href={graduate.data.website}>
                    Visit {graduate.data.first_name}'s website
                  </a>
                </p>
              )}
              {graduate.data.degrees && (
                <>
                  <h3>Degrees</h3>
                  <p>{graduate.data.degrees}</p>
                </>
              )}
              {graduate.data.bio && (
                <>
                  <h3>Biography</h3>
                  <p>{graduate.data.bio}</p>
                </>
              )}
            </Box>
            <Box width={[1, 1, 1 / 2]}>
              <Gallery
                photos={galleryImages}
                onClick={this.openLightbox.bind(this)}
              />
              <Lightbox
                images={galleryImages}
                onClose={this.closeLightbox.bind(this)}
                onClickPrev={this.gotoPrevious.bind(this)}
                onClickNext={this.gotoNext.bind(this)}
                currentImage={this.state.currentImage}
                isOpen={this.state.lightboxIsOpen}
              />
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default GraduateTemplate
