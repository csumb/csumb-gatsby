import React, { Component } from 'react'
import {
  Layout,
  PageTitle,
  SiteHeader,
  SiteNavigation,
} from '../../components/layouts/default'
import Container from '../../components/common/container'
import { graphql } from 'gatsby'
import Blocks from '../../templates/blocks'

class LibraryPage extends Component {
  chatRef = React.createRef()

  componentDidMount() {
    if (typeof window === 'undefined') {
      return
    }
    const script = window.document.createElement('script')
    script.src = 'https://v2.libanswers.com/load_chat.php?hash=addeae1f890e28920bfda5ac4c0a6e26'
    this.chatRef.current.parentNode.insertBefore(script, this.chatRef.current)
  }

  render() {
    const { data } = this.props
    return (
      <Layout pageTitle="Ask a librarian">
        <SiteHeader path="/library">Library</SiteHeader>
        {data.allCsumbNavigation &&
          data.allCsumbNavigation.edges &&
          data.allCsumbNavigation.edges[0] && (
            <SiteNavigation
              navigation={data.allCsumbNavigation.edges[0].node.navigation}
            />
          )}
        <Container>
          <PageTitle>Articles & Databases</PageTitle>

          <div id="libchat_addeae1f890e28920bfda5ac4c0a6e26"></div>
          <div ref={this.chatRef} />

          {data.allCsumbPage &&
            data.allCsumbPage.edges &&
            data.allCsumbPage.edges[0] && (
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
      filter: {
        pagePath: { eq: "library/articles-databases" }
        site: { eq: "library" }
      }
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
