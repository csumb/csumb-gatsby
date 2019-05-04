import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'style/theme'

const PlaceholderCardWrapper = styled('div')`
  background: ${colors.white};
  margin-bottom: 1rem;
  padding: 0.5rem;
`

const PlaceholderText = styled('div')`
  height: 130px;
  background: #eee;
`

const PlaceholderHeader = styled('div')`
  height: 30px;
  margin-bottom: 1rem;
  background: #eee;
`

const PlaceholderCard = () => (
  <PlaceholderCardWrapper>
    <PlaceholderHeader />
    <PlaceholderText />
  </PlaceholderCardWrapper>
)

export { PlaceholderCard }
