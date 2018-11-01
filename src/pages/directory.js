import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/components/site-header'
import { InputText, Submit } from 'components/forms'
import Container from 'components/container'
import { Box, Flex } from '@rebass/grid/emotion'

const DirectoryPage = () => (
  <Layout>
    <SiteHeader path="/directory">Directory</SiteHeader>
    <Container>
      <DirectoryForm />
    </Container>
  </Layout>
)

class DirectoryForm extends React.Component {
  state = {
    search: false,
  }
  handleSubmit(event) {
    event.preventDefault()
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h2>Search people and departments</h2>
        <Flex flexWrap="wrap">
          <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
            <InputText
              name="search"
              label="Search the directory"
              huge
              hideLabel
            />
          </Box>
          <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
            <Submit value="Search" huge nomargin />
          </Box>
        </Flex>
      </form>
    )
  }
}

export default DirectoryPage
