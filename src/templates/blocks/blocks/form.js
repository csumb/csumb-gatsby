import React from 'react'
import styled from 'react-emotion'
import { ContainerContext, ContainerElement } from './container-context'

const FormIframe = styled('iframe')`
  width: 100%;
  height: 400px;
  border: 0;
`

class BlockForm extends React.Component {
  render() {
    const { height, provider } = this.props
    let formUrl = ''
    if (provider.provider === 'google') {
      formUrl = `https://docs.google.com/a/csumb.edu/forms/d/e/${
        provider.form
      }/viewform?embedded=true`
    }
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <FormIframe style={{ height: height + 'px' }} src={formUrl} />
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockForm
