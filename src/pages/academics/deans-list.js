import React from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import { InputText, Submit } from 'components/forms'
import Well from 'components/well'
import Container from 'components/container'
import SiteHeader from 'components/header/site-header'
import PageTitle from 'components/header/page-title'
import SiteNavigation from 'components/navigation/site'
import { Table, TableRow, TableHeader, TableCell } from 'components/table'

class AcademicsPage extends React.Component {
  state = {
    query: false,
    search: false,
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      search: this.state.query.length > 0 ? this.state.query : false,
    })
  }

  render() {
    const { data } = this.props
    const { search } = this.state
    return (
      <Layout pageTitle="Academics">
        <SiteHeader path="/academics">Academics</SiteHeader>
        {data.allCsumbNavigation && (
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
                <TableHeader>College</TableHeader>
                <TableHeader>Major</TableHeader>
                <TableHeader>Last name</TableHeader>
                <TableHeader>First name</TableHeader>
              </tr>
            </thead>
            <tbody>
              {data.allDeansListCsv.edges.map((node, index) => (
                <React.Fragment key={index}>
                  {(!search ||
                    `${node.node.first_name} ${node.node.last_name}`
                      .toLowerCase()
                      .search(search.toLowerCase()) > -1) && (
                    <TableRow>
                      <TableCell>{node.node.college}</TableCell>
                      <TableCell>{node.node.major}</TableCell>
                      <TableCell>{node.node.last_name}</TableCell>
                      <TableCell>{node.node.first_name}</TableCell>
                    </TableRow>
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
