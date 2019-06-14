import React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../style'
import ContentLoader from 'react-content-loader'

const PlaceholderCardWrapper = styled.div`
  background: ${colors.white};
  margin-bottom: 1rem;
  padding: 0.5rem;
`

const PlaceholderCard = () => (
  <PlaceholderCardWrapper>
    <ContentLoader
      height={160}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="10" y="5" rx="4" ry="4" width="380" height="21" />
      <rect x="10" y="40" rx="3" ry="3" width="350" height="15" />
      <rect x="10" y="65" rx="3" ry="3" width="350" height="15" />
      <rect x="10" y="90" rx="3" ry="3" width="350" height="15" />
    </ContentLoader>
  </PlaceholderCardWrapper>
)

export { PlaceholderCard }
