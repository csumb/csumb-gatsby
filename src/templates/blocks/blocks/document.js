import React from 'react'
import styled from 'styled-components'
import { ContainerContext, ContainerElement } from '../container-context'
import VisuallyHidden from 'components/visually-hidden'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'

const Document = styled('a')`
  display: block;
  ${props => props.container} font-weight: bold;
`

const DocumentIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`

class BlockDocument extends React.Component {
  render() {
    const { document, name } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <Document href={document.url}>
              <DocumentIcon icon={faFileDownload} />
              {name}
              <VisuallyHidden>Download document</VisuallyHidden>
            </Document>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockDocument
