import React from 'react'
import NewsContainer from 'components/news-container'

const NodeTypes = {}

NodeTypes.text = ({ node }) => <Marks marks={node.marks}>{node.value}</Marks>

NodeTypes.hyperlink = ({ node }) => (
  <Marks marks={node.marks}>
    <a href={node.data.uri}>
      {node.content.map(node => (
        <ContentNode node={node} />
      ))}
    </a>
  </Marks>
)

NodeTypes['list-item'] = ({ node }) => (
  <li>
    {node.content.map(node => (
      <ContentNode node={node} />
    ))}
  </li>
)

const Marks = ({ marks, children }) => {
  if (!marks) {
    return <>{children}</>
  }
  const allMarks = []
  marks.forEach(mark => {
    allMarks.push(mark.type)
  })
  if (allMarks.indexOf('bold') > -1) {
    return <strong>{children}</strong>
  }
  if (allMarks.indexOf('italic') > -1) {
    return <em>{children}</em>
  }
  return <> {children}</>
}

class ContentItem extends React.Component {}

class ContentTypeParagraph extends ContentItem {
  render() {
    const { item } = this.props
    return (
      <NewsContainer>
        <p>
          {item.content.map(node => (
            <ContentNode node={node} />
          ))}
        </p>
      </NewsContainer>
    )
  }
}

class ContentTypeHeading2 extends ContentItem {
  render() {
    const { item } = this.props
    return (
      <NewsContainer>
        <h2>
          {item.content.map(node => (
            <ContentNode node={node} />
          ))}
        </h2>
      </NewsContainer>
    )
  }
}

class ContentTypeHeading3 extends ContentItem {
  render() {
    const { item } = this.props
    return (
      <NewsContainer>
        <h3>
          {item.content.map(node => (
            <ContentNode node={node} />
          ))}
        </h3>
      </NewsContainer>
    )
  }
}

class ContentTypeHeading4 extends ContentItem {
  render() {
    const { item } = this.props
    return (
      <NewsContainer>
        <h4>
          {item.content.map(node => (
            <ContentNode node={node} />
          ))}
        </h4>
      </NewsContainer>
    )
  }
}

class ContentTypeOrderedList extends ContentItem {
  render() {
    const { item } = this.props
    return (
      <NewsContainer>
        <ol>
          {item.content.map(node => (
            <ContentNode node={node} />
          ))}
        </ol>
      </NewsContainer>
    )
  }
}

class ContentTypeUnorderedList extends ContentItem {
  render() {
    const { item } = this.props
    return (
      <NewsContainer>
        <ul>
          {item.content.map(node => (
            <ContentNode node={node} />
          ))}
        </ul>
      </NewsContainer>
    )
  }
}

const ContentNode = ({ node }) => {
  if (typeof NodeTypes[node.nodeType] === 'undefined') {
    return null
  }
  let Node = NodeTypes[node.nodeType]
  return <Node node={node} />
}

const types = {
  paragraph: ContentTypeParagraph,
  'heading-1': ContentTypeHeading2,
  'heading-2': ContentTypeHeading2,
  'heading-3': ContentTypeHeading3,
  'heading-4': ContentTypeHeading4,
  'ordered-list': ContentTypeOrderedList,
  'unordered-list': ContentTypeUnorderedList,
}

export default types
