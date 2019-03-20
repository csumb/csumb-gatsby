import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/navigation/site'
import Blocks from 'templates/blocks'
import PageTitle from 'components/header/page-title'

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

          <div ref={this.chatRef} />
          <style>{`.libraryh3lp img { width: 150px;}`}</style>

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
