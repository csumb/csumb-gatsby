import React from 'react'

class JsonTemplate extends React.Component {
  render() {
    return <>{this.props.pageContext.json}</>
  }
}

export default JsonTemplate
