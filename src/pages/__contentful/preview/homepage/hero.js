import React, { Component } from 'react'
import url from 'url'
import Loading from '../../../../components/common/loading'
import { Layout } from '../../../../components/layouts/default'
import { HomepageHero } from '../../../../components/homepage'

class ContentfulPreviewHomepageHeroImage extends Component {
  state = {
    hero: false,
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const preview = url.parse(window.location.href, true)
      fetch(
        `https://cdn.contentful.com/spaces/xh3694erm485/assets/${
          preview.query.image
        }?access_token=7e126891adfcb0b446c52306b099e3b645c94c5a97ff5c11b1ca0d7d6e8446a8`
      )
        .then(response => {
          return response.json()
        })
        .then(image => {
          const hero = preview.query
          hero.fixedHeight = hero.fixedHeight === 'true' ? true : false
          hero.darkImage = hero.darkImage === 'true' ? true : false
          hero.lighten = parseInt(hero.lighten)
          hero.imageHeight = hero.imageHeight ? parseInt(hero.imageHeight) : 0
          hero.image = {
            highquality: {
              src: image.fields.file.url,
            },
            lowquality: {
              src: image.fields.file.url,
            },
          }
          console.log(hero)
          this.setState({
            hero: hero,
          })
        })
    }
  }

  render() {
    const { hero } = this.state
    return (
      <Layout noFooterMargin={true}>
        {hero ? (
          <HomepageHero item={hero} />
        ) : (
          <Loading>Loading preview</Loading>
        )}
        <div style={{ height: '400px' }} />
      </Layout>
    )
  }
}

export default ContentfulPreviewHomepageHeroImage
