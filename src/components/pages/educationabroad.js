import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'gatsby-link'
import slugify from 'slugify'
import { colors } from 'style/theme'

const EducationAbroadWrapper = styled('div')`
  margin-bottom: 1rem;
`

const EducationAbroadChildren = styled('div')`
  margin-left: 1.5rem;
`

const CollapsibleIcon = styled(FontAwesomeIcon)`
  margin-right: 0.8rem;
  font-size: 1rem;
`

const EducationExpandButton = styled('button')`
  padding: 0 0 0.3rem 0;
  cursor: pointer;
  border: 0;
  background: transparent;
  width: 100%;
  border-bottom: 1px solid ${colors.primary.darkest};
  text-align: left;
`

class EducationAbroadCountry extends React.Component {
  state = {
    isOpen: false,
  }

  render() {
    const { isOpen } = this.state
    const { country, programs } = this.props
    return (
      <EducationAbroadWrapper>
        <h3>
          <EducationExpandButton
            onClick={event => {
              event.preventDefault()
              this.setState({
                isOpen: !isOpen,
              })
            }}
          >
            <CollapsibleIcon
              size="1x"
              icon={isOpen ? faChevronDown : faChevronRight}
            />
            {country}
          </EducationExpandButton>
        </h3>
        {isOpen && (
          <ul>
            {programs.map(program => (
              <li key={program.recordId}>
                <Link
                  to={`/educationabroad/program/${slugify(
                    program.recordId.replace('rec', '')
                  )}`}
                >
                  {program.data.Name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </EducationAbroadWrapper>
    )
  }
}

class EducationAbroadContinent extends React.Component {
  state = {
    isOpen: false,
  }

  render() {
    const { name, children } = this.props
    const { isOpen } = this.state
    return (
      <EducationAbroadWrapper>
        <h2>
          <EducationExpandButton
            onClick={event => {
              event.preventDefault()
              this.setState({
                isOpen: !isOpen,
              })
            }}
          >
            <CollapsibleIcon
              size="1x"
              icon={isOpen ? faChevronDown : faChevronRight}
            />
            {name}
          </EducationExpandButton>
        </h2>
        {isOpen && (
          <EducationAbroadChildren>{children}</EducationAbroadChildren>
        )}
      </EducationAbroadWrapper>
    )
  }
}

const EducationAbroadProgramList = ({ programs }) => {
  const countryPrograms = {}
  const continents = {
    Africa: [],
    Asia: [],
    Australia: [],
    Europe: [],
    Oceania: [],
    'North America': [],
    'South America': [],
  }
  programs.forEach(({ node }) => {
    const countryName = node.data.Countries[0].data.Name
    const continent = node.data.Countries[0].data.Continent
    if (
      typeof countryPrograms[countryName] === 'undefined' &&
      typeof continents[continent] !== 'undefined'
    ) {
      countryPrograms[countryName] = []
      continents[continent].push(countryName)
    }
    countryPrograms[countryName].push(node)
  })
  Object.keys(continents).forEach(continentName => {
    continents[continentName].sort()
  })
  return (
    <>
      {Object.keys(continents).map(continentName => (
        <>
          {continents[continentName].length > 0 && (
            <EducationAbroadContinent name={continentName}>
              {continents[continentName].map(country => (
                <EducationAbroadCountry
                  country={country}
                  programs={countryPrograms[country]}
                />
              ))}
            </EducationAbroadContinent>
          )}
        </>
      ))}
    </>
  )
}

export { EducationAbroadProgramList }
