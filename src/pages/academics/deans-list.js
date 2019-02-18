import React from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import { InputText, Submit } from 'components/forms'
import Container from 'components/container'
import SiteHeader from 'components/header/site-header'
import PageTitle from 'components/header/page-title'
import SiteNavigation from 'components/navigation/site'
import { Table, TableRow, TableHeader, TableCell } from 'components/table'

class AcademicsPage extends React.Component {
  state = {
    filter: false,
  }

  render() {
    const { data } = this.props
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
              {data.allDeansListCsv.edges.map(node => (
                <TableRow>
                  <TableCell>{node.node.college}</TableCell>
                  <TableCell>{node.node.major}</TableCell>
                  <TableCell>{node.node.last_name}</TableCell>
                  <TableCell>{node.node.first_name}</TableCell>
                </TableRow>
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
