import React from 'react'

class JsonTemplate extends React.Component {
  render() {
    return <>{JSON.stringify(this.props.pageContext.content)}</>
  }
}

export default JsonTemplate
