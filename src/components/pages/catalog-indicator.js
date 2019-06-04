import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'style/theme'

const CatalogIndicatorElement = styled.div`
  background: ${colors.primary.dark};
  color: ${colors.white};
  padding: 0.5rem;
  margin-bottom: 1rem;
  a {
    color: ${colors.white};
  }
`

const CatalogIndicator = () => (
  <CatalogIndicatorElement>
    2019-2020 catalog -{' '}
    <a href="https://csumb.edu/catalog/catalog-archive">View past years</a>
  </CatalogIndicatorElement>
)

export default CatalogIndicator
