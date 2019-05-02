import React from 'react'
import styled from '@emotion/styled'
import VisuallyHidden from 'components/utilities/visually-hidden'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'

const Document = styled('a')`
  display: block;
  ${props => props.container} font-weight: bold;
  margin: 1rem 0;
`

const DocumentIconWrapper = styled('span')`
  display: inline-block;
  max-width: 1rem;
  font-size: 1.2rem;
  margin-right: 0.8rem;
`

const DocumentIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  max-width: 50px;
`

class BlockDocument extends React.Component {
  render() {
    const { document, name } = this.props
    return (
      <Document href={document.url.replace('/csumb.edu/', '/edit.csumb.edu/')}>
        <DocumentIconWrapper>
          <DocumentIcon icon={faFileDownload} />
        </DocumentIconWrapper>
        {name}
        <VisuallyHidden>Download document</VisuallyHidden>
      </Document>
    )
  }
}

export default BlockDocument
