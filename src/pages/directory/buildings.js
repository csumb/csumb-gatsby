import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import PageTitle from 'components/header/page-title'
import styled from 'styled-components'
import { InputText } from 'components/forms'
import Container from 'components/container'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'

const BuildingList = styled('ul')`
  margin: 0;
  list-style-type: none;
`

class DirectoryPage extends React.Component {
  state = {
    search: false,
    buildings: false,
  }

  componentDidMount() {
    let buildings = []
    this.props.data.allCsumbBuilding.edges.map(building => {
      return buildings.push(building.node)
    })
    this.setState({
      buildings: buildings,
    })
  }

  handleChange(event) {
    let buildings = []
    const search = event.target.value.toLowerCase().trim()
    this.props.data.allCsumbBuilding.edges.map(building => {
      if (building.node.buildingName.toLowerCase().search(search) > -1) {
        buildings.push(building.node)
      }
      return true
    })
    this.setState({
      buildings: buildings,
    })
  }

  render() {
    const { buildings } = this.state
    return (
      <Layout>
        <SiteHeader path="/directory">Directory</SiteHeader>
        <Container>
          <PageTitle>All campus buildings</PageTitle>
          <InputText
            name="q"
            label="Filter buildings"
            onChange={this.handleChange.bind(this)}
            hideLabel
            small
            placeholder="Filter"
          />

          {buildings && (
            <BuildingList>
              {buildings.map(building => (
                <li>
                  <Link to={`/buildings/${building.code}`}>
                    {building.buildingName}
                  </Link>
                </li>
              ))}
            </BuildingList>
          )}
        </Container>
      </Layout>
    )
  }
}

export default DirectoryPage

export const query = graphql`
  {
    allCsumbBuilding(sort: { fields: [buildingName] }) {
      edges {
        node {
          buildingName
          code
        }
      }
    }
  }
`
