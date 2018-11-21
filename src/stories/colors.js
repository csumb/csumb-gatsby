import React from 'react'
import { storiesOf } from '@storybook/react'
import typography from 'utils/typography'
import { colors } from 'components/styles/theme'
import styled from 'react-emotion'
import { Flex, Box } from '@rebass/grid/emotion'

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

const Color = ({ name, color }) => (
  <ColorFlex flexWrap="wrap">
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
  .add('White', () => <Color name="white" color={colors.white} />)
  .add('Black', () => <Color name="black" color={colors.black} />)
  .add('Primary', () => (
    <>
      {Object.keys(colors.primary).map(name => (
        <Color name={name} color={colors.primary[name]} />
      ))}
    </>
  ))
  .add('Muted', () => (
    <>
      {Object.keys(colors.muted).map(name => (
        <Color name={name} color={colors.muted[name]} />
      ))}
    </>
  ))

  .add(
    'Indicators',
    () => (
      <>
        {Object.keys(colors.indicators).map(name => (
          <Color name={name} color={colors.indicators[name]} />
        ))}
      </>
    ),
    {
      info: 'Used for high-visibility elements, alerts.',
    }
  )
storiesOf('Colors/Secondary', module).add('Highlight', () => (
  <>
    {Object.keys(colors.secondary.highlight).map(name => (
      <Color name={name} color={colors.secondary.highlight[name]} />
    ))}
  </>
))
