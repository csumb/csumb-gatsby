import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'
import Link from 'gatsby-link'
import Loading from 'components/common/loading'

const Person = styled('div')`
  margin: 0.5rem 0;
  padding: 0.5rem;
`

const PersonPosition = styled('p')``

const PersonPositionTitle = styled('span')`
  display: block;
  font-weight: bold;
`

const PersonPhoto = styled('img')`
  width: 100%;
`

class BlockPerson extends Component {
  state = {
    person: false,
    didLoad: false,
  }

  componentDidMount() {
    const { email } = this.props
    const link = email
      .split('@')
      .shift()
      .toLowerCase()
    fetch(`/directory/json/${link}.json`)
      .then(response => {
        return response.json()
      })
      .then(person => {
        this.setState({
          person: person,
          didLoad: true,
        })
      })
      .catch(error => {
        this.setState({
          person: false,
          didLoad: true,
        })
      })
  }

  render() {
    const { person, didLoad } = this.state
    const { compact } = this.props
    return (
      <div>
        {!didLoad && <Loading />}
        {person && (
          <Person id={`profile-${person.email.split('@').shift()}`}>
            {compact ? (
              <Flex flexWrap="wrap">
                <Box width={[1, 1 / 3]} pr={[0, 2]}>
                  <strong>
                    <Link
                      to={`/directory/person/${person.email
                        .split('@')
                        .shift()}`}
                    >
                      {person.firstName} {person.lastName}
                    </Link>
                  </strong>
                </Box>
                <Box width={[1, 1 / 3]} pr={[0, 2]}>
                  {person.directoryTitle.map((title, key) => (
                    <PersonPosition>
                      <PersonPositionTitle>{title}</PersonPositionTitle>
                      {person._fullDepartments &&
                      person._fullDepartments[key] ? (
                        <>
                          {person._fullDepartments[key].website ? (
                            <Link to={person._fullDepartments[key].website}>
                              {person._fullDepartments[key].name}
                            </Link>
                          ) : (
                            <>{person._fullDepartments[key].name}</>
                          )}
                        </>
                      ) : (
                        <>{person.directoryDepartment[key]}</>
                      )}
                    </PersonPosition>
                  ))}
                </Box>

                <Box width={[1, 1 / 3]}>
                  <a href={`mailto:${person.email}`}>{person.email}</a>
                  {person._publicDirectory && person._publicDirectory.phone && (
                    <p>{person._publicDirectory.phone}</p>
                  )}
                </Box>
              </Flex>
            ) : (
              <Flex flexWrap="wrap">
                <Box width={[1, 3 / 4]} pr={2}>
                  <h3>
                    <Link
                      to={`/directory/person/${person.email
                        .split('@')
                        .shift()}`}
                    >
                      {person.firstName} {person.lastName}
                    </Link>
                  </h3>
                  {person.directoryTitle.map((title, key) => (
                    <PersonPosition>
                      <PersonPositionTitle>{title}</PersonPositionTitle>
                      <Link>{person.directoryDepartment[key]}</Link>
                    </PersonPosition>
                  ))}
                  <a href={`mailto:${person.email}`}>{person.email}</a>
                  {person._publicDirectory && person._publicDirectory.phone && (
                    <p>{person._publicDirectory.phone}</p>
                  )}
                  {person._publicDirectory.building && (
                    <p>
                      <Link
                        to={`/directory/building/${
                          person._publicDirectory.buildingCode
                        }`}
                      >
                        {person._publicDirectory.building}
                      </Link>
                      <br />
                      {person._publicDirectory.location.split('-').pop()}
                    </p>
                  )}
                </Box>
                <Box width={[1, 1 / 4]}>
                  {person._publicDirectory && person._publicDirectory.photo && (
                    <PersonPhoto
                      src={person._publicDirectory.photo.replace(
                        '/csumb.edu/',
                        '/edit.csumb.edu/'
                      )}
                      alt=""
                    />
                  )}
                </Box>
              </Flex>
            )}
          </Person>
        )}
      </div>
    )
  }
}

export default BlockPerson
