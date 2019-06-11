import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import { InputText, Submit } from 'components/common/forms'
import Well from 'components/common/well'
import Container from 'components/common/container'
import SiteHeader from 'components/layouts/sections/header/site-header'
import PageTitle from 'components/layouts/sections/header/page-title'
import { SiteNavigation } from 'components/layouts/sections/navigation'
import { LinkyButton } from 'components/common/button'
import styled from '@emotion/styled'
import url from 'url'
import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from 'components/common/table'

const TermSelectLink = styled(LinkyButton)`
  display: inline-block;
  margin-right: 1rem;
  ${props => props.isSelected && `font-weight: bold;`}
`

const displayTerm = year => {
  return (year.charAt(0).toUpperCase() + year.slice(1)).replace(
    /([0-9])/,
    ' $1'
  )
}

class AcademicsPage extends Component {
  state = {
    query: false,
    search: false,
    currentTerm: false,
    termList: [],
    college: false,
    major: false,
  }

  componentDidMount() {
    const { data } = this.props
    const terms = []
    data.allDeansListCsv.edges.forEach(({ node }) => {
      if (terms.indexOf(node.year) === -1) {
        terms.push(node.year)
      }
    })
    this.setState({
      termList: terms,
    })

    if (typeof window !== 'undefined') {
      let location = url.parse(window.location.href, true)
      if (location.query && typeof location.query.type !== 'undefined') {
        if (location.query.type === 'college') {
          this.setState({
            college: location.query.name,
          })
        }
        if (location.query.type === 'major') {
          this.setState({
            major: location.query.name,
          })
        }
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      search: this.state.query.length > 0 ? this.state.query : false,
    })
  }

  render() {
    const { data } = this.props
    const { search, termList, currentTerm, college, major } = this.state
    return (
      <Layout pageTitle="Academics">
        <SiteHeader path="/academics">Academics</SiteHeader>
        {data.allCsumbNavigation &&
          data.allCsumbNavigation.edges &&
          data.allCsumbNavigation.edges[0] && (
            <SiteNavigation
              navigation={data.allCsumbNavigation.edges[0].node.navigation}
            />
          )}
        <Container>
          <PageTitle layout="page">Dean's list</PageTitle>
          <p>
            Semester honors are awarded and the notation "Dean’s List" is posted
            to the permanent academic record for undergraduate students earning
            a 3.50 grade point average. To be eligible, students must complete a
            minimum of 12 letter-graded units with no incomplete grades, no
            grade lower than "C" and be in good standing.
          </p>
          <Well>
            <p>
              {termList.map(term => (
                <TermSelectLink
                  onClick={event => {
                    event.preventDefault()
                    this.setState({
                      currentTerm: term,
                    })
                  }}
                  isSelected={term === currentTerm}
                >
                  {displayTerm(term)}
                </TermSelectLink>
              ))}
              <TermSelectLink
                onClick={event => {
                  event.preventDefault()
                  this.setState({
                    currentTerm: false,
                  })
                }}
              >
                View all terms
              </TermSelectLink>
            </p>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <InputText
                name="search"
                label="Search dean's list"
                hideLabel={true}
                placeholder="Search by name"
                inline
                onChange={event => {
                  this.setState({
                    query: event.target.value,
                  })
                }}
              />
              <Submit value="Search" small style={{ marginLeft: '1rem' }} />
            </form>
          </Well>
          <Table>
            <thead>
              <tr>
                <TableHeader>Term</TableHeader>
                <TableHeader>College</TableHeader>
                <TableHeader>Major</TableHeader>
                <TableHeader>Last name</TableHeader>
                <TableHeader>First name</TableHeader>
              </tr>
            </thead>
            <tbody>
              {data.allDeansListCsv.edges.map(({ node }, index) => (
                <React.Fragment key={index}>
                  {(!search ||
                    `${node.first_name} ${node.last_name}`
                      .toLowerCase()
                      .search(search.toLowerCase()) > -1) && (
                    <>
                      {(!currentTerm || currentTerm === node.year) && (
                        <>
                          {(!major || major === node.major) &&
                            (!college || college === node.college) && (
                              <TableRow>
                                <TableCell>{displayTerm(node.year)}</TableCell>
                                <TableCell>{node.college}</TableCell>
                                <TableCell>{node.major}</TableCell>
                                <TableCell>{node.last_name}</TableCell>
                                <TableCell>{node.first_name}</TableCell>
                              </TableRow>
                            )}
                        </>
                      )}
                    </>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Container>
      </Layout>
    )
  }
}

export default AcademicsPage

export const query = graphql`
  {
    allDeansListCsv {
      edges {
        node {
          year
          college
          major
          last_name
          first_name
        }
      }
    }

    allCsumbNavigation(filter: { site: { eq: "cost" } }) {
      edges {
        node {
          navigation
        }
      }
    }
  }
`
