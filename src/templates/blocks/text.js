import React from 'react'
import filterCourses from './filter-courses'
import { css } from 'emotion'

class BlockText extends React.Component {
  createMarkup(text) {
    return {
      __html: filterCourses(text),
    }
  }

  render() {
    let className = null
    if (this.props.block.data.lead) {
      className = css(`
        font-size: 130%;
      `)
    }
    return (
      <p
        className={className}
        dangerouslySetInnerHTML={this.createMarkup(this.props.block.data.text)}
      />
    )
  }
}

export default BlockText
