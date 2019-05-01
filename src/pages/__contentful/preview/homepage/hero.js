import React from 'react'
import url from 'url'
import Loading from 'components/common/loading'

const token = '71f3a6acaec97fe03fa4e9b5c6f2e4eeaf6290b54c6eb0ce08a102480ce69564'

class ContentfulPreviewHomepageHeroImage extends React.Component {
  state = {
    hero: false,
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const preview = url.parse(window.location.href, true)
      this.setState({
        hero: preview.query,
      })
    }
  }

  render() {
    const { hero } = this.state
    return <>{hero ? <p>hero</p> : <Loading>Loading preview</Loading>}</>
  }
}

export default ContentfulPreviewHomepageHeroImage
