import React from 'react'
import Layout from '../components/layouts/default'
import Link from 'gatsby-link'
import { graphql } from "gatsby"

const AcademicsFilterForm = () => {
  return (
    <form>
      <input type="text" placeholder="Search"/>
    </form>
  )
}
class AcademicsPage extends React.Component {
  
  
  
  render() {
    const sheets = this.props.data.allGoogleSheetSheet1Row;
    return (
      <Layout>
        <h1>Academics</h1>
        <AcademicsFilterForm/>
        {sheets.edges.map((row, i) => (
          <p>
            <Link to={row.node.link.replace('https://csumb.edu/', '/')}>
              {row.node.name}
            </Link>
            {row.node.description}
          </p>
        ))}
      </Layout>
    );
  }
}

export default AcademicsPage;

export const query = graphql`
  {
    allGoogleSheetSheet1Row {
      edges {
        node {
          name
          program
          link
          id
          description
        }
      }
    }
  }`