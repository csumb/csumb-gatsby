import React from 'react'
import {
  Layout,
  PageTitle,
  SiteHeader,
  SiteNavigation,
} from '../../components/layouts/default'
import Container from '../../components/common/container'
import { graphql } from 'gatsby'
import { colors } from '../../style'
import styled from '@emotion/styled'
import LinkInspect from '../../components/utilities/link-inspect'
import BreakpointContext from '../../components/contexts/breakpoint'
import { Flex, Box } from '../../components/common/grid'
import { ButtonLink } from '../../components/common/button'
import { UnstyledList } from '../../components/common/type'

const OptionsHeaderWrapper = styled.div`
  position: sticky;
`

const OptionsHeader = styled(Flex)`
  background: ${colors.primary.darkest};
  color: ${colors.white};
`

const OptionsRow = styled.div`
  border-bottom: 1px solid ${colors.gray.light};
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
`

const CategoryName = styled.h4`
  margin: 0.5rem 0;
`

const MobileLabel = styled.strong`
  display: inline-block;
  margin-right: 1rem;
`

const HousingOptionsMobile = ({ data }) => (
  <>
    {data.allCsumbHousingOption.edges.map(({ node }) => (
      <div key={node.option.name}>
        <>
          <h2>{node.option.name}</h2>
          <UnstyledList>
            {data.allCsumbHousingCategory.edges.map((edge, key) => (
              <li key={`${node.option.name}-${key}`}>
                <MobileLabel>{edge.node.name}</MobileLabel>
                {edge.node.category === 'rates' ? (
                  <>
                    {node.option[edge.node.category] && (
                      <LinkInspect to={node.option[edge.node.category]}>
                        View rates
                      </LinkInspect>
                    )}
                  </>
                ) : (
                  <>
                    {node.option[edge.node.category] && (
                      <>{node.option[edge.node.category]}</>
                    )}
                  </>
                )}
              </li>
            ))}
          </UnstyledList>
        </>
      </div>
    ))}
  </>
)
const HousingOptionsDesktop = ({ data }) => (
  <>
    <OptionsHeaderWrapper>
      <OptionsHeader>
        {data.allCsumbHousingOption.edges.map(({ node }) => (
          <Box
            width={1 / data.allCsumbHousingOption.edges.length}
            px={4}
            py={3}
            key={node.option.name}
          >
            {node.option.name}
          </Box>
        ))}
      </OptionsHeader>
    </OptionsHeaderWrapper>
    {data.allCsumbHousingCategory.edges.map(({ node }) => (
      <OptionsRow key={node.name}>
        <CategoryName>{node.name}</CategoryName>
        <Flex>
          {data.allCsumbHousingOption.edges.map((edge, key) => (
            <Box
              width={1 / data.allCsumbHousingOption.edges.length}
              px={4}
              py={2}
              key={`${node.category}-${key}`}
            >
              {node.category === 'rates' ? (
                <>
                  {edge.node.option[node.category] && (
                    <ButtonLink to={edge.node.option[node.category]}>
                      View rates
                    </ButtonLink>
                  )}
                </>
              ) : (
                <>
                  {edge.node.option[node.category] && (
                    <>{edge.node.option[node.category]}</>
                  )}
                </>
              )}
            </Box>
          ))}
        </Flex>
      </OptionsRow>
    ))}
  </>
)

const HousingOptionsPage = ({ data }) => (
  <Layout pageTitle="Compare housing options">
    <SiteHeader path="/housing">
      Student Housing &amp; Residential Life
    </SiteHeader>
    {data.allCsumbNavigation &&
      data.allCsumbNavigation.edges &&
      data.allCsumbNavigation.edges[0] && (
        <SiteNavigation
          navigation={data.allCsumbNavigation.edges[0].node.navigation}
        />
      )}
    <Container topPadding>
      <PageTitle>Compare Housing Options</PageTitle>

      <BreakpointContext.Consumer>
        {context => (
          <>
            {context.isMobile ? (
              <HousingOptionsMobile data={data} />
            ) : (
              <HousingOptionsDesktop data={data} />
            )}
          </>
        )}
      </BreakpointContext.Consumer>
    </Container>
  </Layout>
)

export default HousingOptionsPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "housing" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allCsumbHousingCategory {
      edges {
        node {
          name
          category
        }
      }
    }
    allCsumbHousingOption {
      edges {
        node {
          option {
            name
            rates
            availabletofreshmen
            availabletosophomores
            availabletojuniors
            availabletoseniorsandgraduatestudents
            availabletofamilies
            bedroomstyles
            furnished
            buildingtype
            elevator
            campuslocation
            walkingtimetomainquad
            mailroom
            kitchenette
            commonkitchen
            laundry
            cabletv
            highspeedethernet
            themeprograms
            mealplanrequired
            petsallowed
          }
        }
      }
    }
  }
`
