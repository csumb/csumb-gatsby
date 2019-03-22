import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/navigation/site'
import Well from 'components/well'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import { LinkyButton } from 'components/button'
import { Flex, Box } from '@rebass/grid/emotion'
import PageTitle from 'components/header/page-title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const allServicesPageId = 21910

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

const Letter = styled('a')`
  display: inline-block;
  margin-right: 0.5rem;
`

const PageListItem = styled('div')`
  margin: 0.5rem 0;
`

const PageListBox = styled(Box)`
  border-right: 1px solid ${colors.muted.light};
`

const UniversityPersonnelPagesChevron = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
  float: right;
  display: inline-block;
`

const UniversityPersonnelPagesButton = styled(LinkyButton)`
  display: block;
  width: 100%;
`

class UniversityPersonnelPages extends React.Component {
  state = {
    expanded: [],
  }

  render() {
    const { pages, parentId } = this.props
    const { expanded } = this.state
    if (!pages) {
      return null
    }

    pages.forEach(page => {
      page.node.data.__hasChildren = false
      pages.forEach(child => {
        if (child.node.data && child.node.data.Parent) {
          child.node.data.Parent.forEach(parent => {
            if (parent.data.Page_ID === page.node.data.Page_ID) {
              page.node.data.__hasChildren = true
            }
          })
        }
      })
    })

    return (
      <Flex flexWrap="wrap">
        <UniversityPersonnelPagesList
          pages={pages}
          parentId={parentId}
          showPageTitle={false}
          handleExpand={id => {
            this.setState({
              expanded: [id],
            })
          }}
        />
        {expanded[0] && (
          <UniversityPersonnelPagesList
            pages={pages}
            parentId={expanded[0]}
            showPageTitle={true}
            handleExpand={id => {
              this.setState({
                expanded: [expanded[0], id],
              })
            }}
          />
        )}
        {expanded[1] && (
          <UniversityPersonnelPagesList
            pages={pages}
            parentId={expanded[1]}
            noButtons={true}
            showPageTitle={true}
          />
        )}
      </Flex>
    )
  }
}

const UniversityPersonnelPagesList = ({
  pages,
  parentId,
  handleExpand,
  showPageTitle,
  noButtons,
}) => {
  const listPages = []
  let currentPage = false
  pages.forEach(page => {
    if (page.node.data.Page_ID === parentId) {
      currentPage = page
    }
    if (page.node.data && page.node.data.Parent) {
      page.node.data.Parent.forEach(parent => {
        if (parent.data && parent.data.Page_ID === parentId) {
          listPages.push(page)
        }
      })
    }
  })

  return (
    <PageListBox width={[1, 1 / 3]} pr={[0, 2]} pl={[0, 2]}>
      {showPageTitle && (
        <div>
          <h2>
            <a href={currentPage.node.data.Link}>
              {currentPage.node.data.Name}
            </a>
          </h2>
          <p>{currentPage.node.data.Content}</p>
        </div>
      )}
      {listPages.map(page => (
        <PageListItem key={page.node.id}>
          <h4>
            {page.node.data.__hasChildren && !noButtons ? (
              <UniversityPersonnelPagesButton
                onClick={event => {
                  event.preventDefault()
                  handleExpand(page.node.data.Page_ID)
                }}
              >
                <UniversityPersonnelPagesChevron icon={faChevronRight} />
                {page.node.data.Name}
              </UniversityPersonnelPagesButton>
            ) : (
              <a href={page.node.data.Link}>{page.node.data.Name}</a>
            )}
          </h4>
          <p>{page.node.data.Content}</p>
        </PageListItem>
      ))}
    </PageListBox>
  )
}

class UniversityPersonnelServicesPage extends React.Component {
  render() {
    const { data } = this.props
    return (
      <Layout pageTitle="University Personnel">
        <SiteHeader path="/up">University Personnel</SiteHeader>
        {data.allCsumbNavigation && (
          <SiteNavigation
            navigation={data.allCsumbNavigation.edges[0].node.navigation}
          />
        )}
        <Container>
          <PageTitle>Index</PageTitle>
          <Well>
            {alphabet.map(letter => (
              <Letter href={`#letter-${letter}`}>{letter.toUpperCase()}</Letter>
            ))}
          </Well>
          <UniversityPersonnelPages
            pages={data.allAirtable.edges}
            parentId={allServicesPageId}
          />
        </Container>
      </Layout>
    )
  }
}

export default UniversityPersonnelServicesPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "up" } }) {
      edges {
        node {
          navigation
        }
      }
    }

    allAirtable(
      filter: { queryName: { in: ["UniversityPersonnelPages"] } }
      sort: { fields: [data___Name] }
    ) {
      edges {
        node {
          id
          table
          recordId
          data {
            Name
            Notes
            Content
            Page_ID
            Link
            Parent {
              id
              data {
                Page_ID
                Name
                Notes
                Link
              }
            }
          }
        }
      }
    }
  }
`
