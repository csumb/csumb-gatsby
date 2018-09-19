import React from 'react'
import Layout from '../components/layouts/default'
import Link from 'gatsby-link'
import { graphql } from "gatsby"
import { navigate } from "@reach/router"

class AcademicsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      filteredItems: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
    navigate(`?f=${this.state.filter}`)

    if(this.state.filter.trim().length < 3) {
      return;
    }
    //Filter all the rows from the sheet and add them to the component's filteredItems state
    var filteredItems = []
    this.props.data.allGoogleSheetSheet1Row.edges.map((row) => {
      if(row.node.name.toLowerCase().search(this.state.filter) > -1) {
        filteredItems.push(row.node)
      } 
      return filteredItems
    })
    this.setState({
      filteredItems: filteredItems
    })
  }

  handleChange(event) {
    this.setState({
      filter: event.target.value
    });
  }

  AcademicsResults(items) {
    return (
      <ul>
      {items.map((result) => (
        <li>{result.name}</li>
      ))}
      </ul>
    )
  }
  
  render() {
    const sheets = this.props.data.allGoogleSheetSheet1Row;

    return (
      <Layout>
        <h1>Academics</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search" onChange={this.handleChange}/>
          <input type="submit" value="Search"/>
        </form>
        {this.state.filteredItems.length ?
          this.AcademicsResults(this.state.filteredItems) :
          null
        }
        {sheets.edges.map((row) => (
          <p key={row.node.id}>
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