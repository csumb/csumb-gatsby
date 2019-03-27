import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import PageTitle from 'components/header/page-title'
import styled from '@emotion/styled'
import Container from 'components/container'
import LinkInspect from 'components/link-inspect'
import Well from 'components/well'
import { graphql } from 'gatsby'
import { DirectoryNavigation } from 'components/pages/directory'

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
const existingLetters = {}

const Letter = styled('a')`
  display: inline-block;
  margin-right: 0.5rem;
`

const DepartmentListingItem = styled('div')`
  margin-bottom: 1rem;
  h3 {
    margin-bottom: 0.3rem;
  }
  p {
    margin-bottom: 0;
  }
`

const DirectoryDepartmentPage = ({ data }) => {
  const addLetter = letter => {
    existingLetters[letter.toLowerCase()] = letter
  }
  return (
    <Layout>
      <SiteHeader path="/directory">Directory</SiteHeader>
      <DirectoryNavigation />
      <Container>
        <PageTitle>All departments</PageTitle>
        <Well>
          {alphabet.map(letter => (
            <Letter href={`#letter-${letter}`}>{letter.toUpperCase()}</Letter>
          ))}
        </Well>
        {data.allCsumbDepartment.edges.map(department => (
          <React.Fragment key={department.node.id}>
            {!existingLetters[
              department.node.name.substr(0, 1).toLowerCase()
            ] && (
              <>
                {addLetter(department.node.name.substr(0, 1))}
                <h2
                  id={`letter-${department.node.name
                    .substr(0, 1)
                    .toLowerCase()}`}
                >
                  {department.node.name.substr(0, 1).toUpperCase()}
                </h2>
              </>
            )}
            <DepartmentListingItem>
              <h3>
                {department.node.website ? (
                  <LinkInspect to={department.node.website}>
                    {department.node.name}
                  </LinkInspect>
                ) : (
                  <>{department.node.name}</>
                )}
              </h3>
              {department.node.email && (
                <p>
                  <a href={`mailto:${department.node.email}`}>
                    {department.node.email}
                  </a>
                </p>
              )}
              {department.node.phone && <p>{department.node.phone}</p>}
            </DepartmentListingItem>
          </React.Fragment>
        ))}
      </Container>
    </Layout>
  )
}

export default DirectoryDepartmentPage

export const query = graphql`
  {
    allCsumbDepartment(sort: { fields: name }) {
      edges {
        node {
          id
          name
          phone
          email
          website
        }
      }
    }
  }
`
