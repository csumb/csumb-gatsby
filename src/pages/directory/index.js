import React, { Component } from 'react'
import { Layout, SiteHeader } from '../../components/layouts/default'
import styled from '@emotion/styled'
import { InputText, Submit } from '../../components/common/forms'
import Container from '../../components/common/container'
import Link from 'gatsby-link'
import { Box, Flex } from '../../components/common/grid'
import { graphql } from 'gatsby'
import phoneFormatter from 'phone-formatter'
import { DirectoryNavigation } from '../../components/pages/directory'

const DirectoryPage = ({ data }) => (
  <Layout pageTitle="Directory">
    <SiteHeader path="/directory">Directory</SiteHeader>
    <DirectoryNavigation />
    <Container topPadding>
      <DirectoryForm directory={data.allCsumbDirectory.edges} />
      <Flex>
        <Box width={[1, 1 / 2]} px={2}>
          <h3>Important numbers</h3>
          <ul>
            <li>
              <strong>
                <a href="/csc">Campus Service Center</a>
              </strong>{' '}
              (831) 582-5100
            </li>
            <li>
              <strong>
                <a href="/financialaid">Financial Aid</a>
              </strong>{' '}
              (831) 582-5100
            </li>
            <li>
              <strong>
                <a href="/admissions">Admissions</a>
              </strong>{' '}
              (831) 582-3738
            </li>
            <li>
              <strong>
                <a href="/housing">Student Housing</a>
              </strong>{' '}
              (831) 582-3378
            </li>
          </ul>
        </Box>
        <Box width={[1, 1 / 2]} px={2}>
          <h3>University police</h3>
          <ul>
            <li>
              <strong>Emergency:</strong> 911
            </li>
            <li>
              <strong>Non-emergency:</strong> (831) 655-0268
            </li>
            <li>
              <strong>Emergency conditions:</strong> (831) 582-5044
            </li>
          </ul>
        </Box>
      </Flex>
    </Container>
  </Layout>
)

const ShortPersonName = styled.span`
  font-weight: bold;
`

const ShortPersonPhone = styled.span`
  margin-left: 1rem;
  display: inline-block;
`

const ShortPersonList = styled.ul`
  list-style-type: none;
  margin-left: 0;
  margin-top: 1rem;
`

const ShortPersonListing = ({ firstName, lastName, email, _publicProfile }) => {
  const link = email.split('@').shift()
  return (
    <li>
      <Link to={`/directory/person/${link}`}>
        <ShortPersonName>
          {firstName} {lastName}
        </ShortPersonName>
      </Link>
      {_publicProfile && _publicProfile.phone && (
        <ShortPersonPhone>
          {phoneFormatter.format(_publicProfile.phone, '(NNN) NNN-NNNN')}
        </ShortPersonPhone>
      )}
    </li>
  )
}

class DirectoryForm extends Component {
  state = {
    search: false,
    query: false,
  }

  handleChange(event) {
    const { directory } = this.props
    const query = event.target.value
    this.setState({
      query: query,
    })
    if (query.length < 3) {
      this.setState({
        search: false,
      })
      return
    }
    let search = []
    directory.forEach(person => {
      const { user } = person.node
      const name = `${user.firstName} ${user.lastName}`

      if (name.toLowerCase().search(query.toLowerCase()) > -1) {
        search.push(user)
      } else {
        if (
          query.length > 3 &&
          user._publicProfile &&
          user._publicProfile.phone &&
          user._publicProfile.phone.replace(/\D/g, '').search(query) > -1
        ) {
          search.push(user)
        }
      }
    })
    this.setState({
      search: search,
    })
  }

  render() {
    const { search } = this.state
    return (
      <form method="get" action="/directory/search">
        <h2>Search people and departments</h2>
        <Flex>
          <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
            <InputText
              name="q"
              label="Search the directory"
              onChange={this.handleChange.bind(this)}
              huge
              hideLabel
            />
          </Box>
          <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
            <Submit value="Search" huge nomargin />
          </Box>
        </Flex>
        {search && (
          <ShortPersonList>
            {search.map(result => (
              <ShortPersonListing key={result.email} {...result} />
            ))}
          </ShortPersonList>
        )}
      </form>
    )
  }
}

export default DirectoryPage

export const query = graphql`
  {
    allCsumbDirectory(sort: { fields: [user___lastName, user___firstName] }) {
      edges {
        node {
          user {
            firstName
            lastName
            email
            directoryJobCode
            _publicProfile {
              phone
              biography
              photo
              buildingCode
              location
              appointmentCalendar
            }
          }
        }
      }
    }
  }
`
