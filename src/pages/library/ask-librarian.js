import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/navigation/site'
import Blocks from 'templates/blocks'
import PageTitle from 'components/header/page-title'
import { Flex, Box } from '@rebass/grid/emotion'

class LibraryPage extends React.Component {
  chatRef = React.createRef()

  componentDidMount() {
    if (typeof window === 'undefined') {
      return
    }
    const script = window.document.createElement('script')
    script.src = '//us.libraryh3lp.com/js/libraryh3lp.js?8169'
    this.chatRef.current.parentNode.insertBefore(script, this.chatRef.current)
  }

  render() {
    const { data } = this.props
    return (
      <Layout pageTitle="Ask a librarian">
        <SiteHeader path="/library">Library</SiteHeader>
        {data.allCsumbNavigation && (
          <SiteNavigation
            navigation={data.allCsumbNavigation.edges[0].node.navigation}
          />
        )}
        <Container>
          <PageTitle>Ask a librarian</PageTitle>
          <Flex flexWrap="wrap">
            <Box width={[1, 1 / 2]} pr={[0, 4]}>
              <h3>Chat with us</h3>
              <style>{`.libraryh3lp img { width: 150px;}`}</style>
              <div className="needs-js" ref={this.chatRef} />
            </Box>
            <Box width={[1, 1 / 2]}>
              <h3>Text us</h3>
              <p>
                Text us from your cell phone at <strong>(831) 621-5866</strong>.
                Standard text messaging rates may apply.
              </p>
            </Box>
          </Flex>
          {data.allCsumbPage && (
            <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
          )}
        </Container>
      </Layout>
    )
  }
}

export default LibraryPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "library" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allCsumbPage(
      filter: { pagePath: { eq: "ask-librarian" }, site: { eq: "library" } }
    ) {
      edges {
        node {
          pageContent
          layout
        }
      }
    }
  }
`
