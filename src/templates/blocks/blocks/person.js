import React from 'react'
import { ContainerElement } from '../container-context'
import styled from 'react-emotion'
import { Flex, Box } from '@rebass/grid/emotion'
import Link from 'gatsby-link'

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

class BlockPerson extends React.Component {
  state = {
    person: false,
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
        })
      })
      .catch(error => {
        this.setState({
          person: false,
        })
      })
  }

  render() {
    const { person } = this.state
    const { compact } = this.props
    return (
      <ContainerElement isFull>
        {person && (
          <Person>
            {compact ? (
              <p>
                <Link
                  to={`/directory/person/${person.email.split('@').shift()}`}
                >
                  {person.firstName} {person.lastName}
                </Link>
              </p>
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
                  </Box>
                  <Box width={[1, 1 / 4]}>
                    {person.directoryPhoto && (
                      <PersonPhoto src={person.directoryPhoto} alt="" />
                    )}
                  </Box>
                </Flex>
              )}
          </Person>
        )}
      </ContainerElement>
    )
  }
}

export default BlockPerson
