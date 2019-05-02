import React from 'react'
import url from 'url'
import Loading from 'components/common/loading'

class ContentfulPreviewHomepageHeroImage extends React.Component {
  state = {
    hero: false,
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const preview = url.parse(window.location.href, true)
      console.log(preview)
    }
  }

  render() {
    const { hero } = this.state
    return <>{hero ? <p>hero</p> : <Loading>Loading preview</Loading>}</>
  }
}

export default ContentfulPreviewHomepageHeroImage
