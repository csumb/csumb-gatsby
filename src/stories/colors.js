import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import typography from '../style/typography'
import { colors } from '../style'
import styled from '@emotion/styled'
import { Flex, Box } from '../components/common/grid'

const ColorBox = styled(Box)`
  border: 1px solid #000;
  padding: 1px;
`

const Swatch = styled('div')`
  height: 50px;
`

const ColorCode = styled('code')`
  font-weight: bold;
  font-family: Menlo, Monaco, 'Courier New', monospace;
  font-size: 1.5rem;
`

const ColorName = styled('span')`
  font-weight: bold;
`

const ColorFlex = styled(Flex)`
  margin-bottom: 1rem;
`

const ColorLabel = () => (
  <Flex>
    <Box width={[1 / 3]} px={2}>
      <h3>Swatch</h3>
    </Box>
    <Box width={[1 / 3]} px={2}>
      <h3>Hex code</h3>
    </Box>
    <Box width={[1 / 3]} px={2}>
      <h3>Name</h3>
    </Box>
  </Flex>
)

const Color = ({ name, color }) => (
  <ColorFlex>
    <ColorBox width={[1 / 3]} px={2}>
      <Swatch
        style={{
          backgroundColor: color,
        }}
      />
    </ColorBox>
    <Box width={[1 / 3]} px={2}>
      <ColorCode>{color}</ColorCode>
    </Box>
    <Box width={[1 / 3]} px={2}>
      <ColorName>{name}</ColorName>
    </Box>
  </ColorFlex>
)

typography.injectStyles()

storiesOf('Colors', module)
  .add('White', () => (
    <>
      <ColorLabel />
      <Color name="white" color={colors.white} />
    </>
  ))
  .add('Black', () => (
    <>
      <ColorLabel />
      <Color name="black" color={colors.black} />
    </>
  ))
  .add('Primary', () => (
    <>
      <ColorLabel />
      {Object.keys(colors.primary).map(name => (
        <Color name={name} color={colors.primary[name]} />
      ))}
    </>
  ))
  .add('Buttons', () => (
    <>
      <ColorLabel />
      {Object.keys(colors.buttons).map(name => (
        <Color name={name} color={colors.buttons[name]} />
      ))}
    </>
  ))
  .add('Muted', () => (
    <>
      <ColorLabel />
      {Object.keys(colors.muted).map(name => (
        <Color name={name} color={colors.muted[name]} />
      ))}
    </>
  ))

  .add(
    'Indicators',
    () => (
      <>
        <ColorLabel />
        {Object.keys(colors.indicators).map(name => (
          <Color name={name} color={colors.indicators[name]} />
        ))}
      </>
    ),
    {
      info: 'Used for high-visibility elements, alerts.',
    }
  )
storiesOf('Colors/Secondary', module)
  .add('Highlight', () => (
    <>
      <ColorLabel />
      {Object.keys(colors.secondary.highlight).map(name => (
        <Color name={name} color={colors.secondary.highlight[name]} />
      ))}
    </>
  ))
  .add('Saturated', () => (
    <>
      <ColorLabel />
      {Object.keys(colors.secondary.saturated).map(name => (
        <Color name={name} color={colors.secondary.saturated[name]} />
      ))}
    </>
  ))
