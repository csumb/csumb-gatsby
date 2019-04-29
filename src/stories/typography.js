import React from 'react'
import { storiesOf } from '@storybook/react'
import { LeadParagraph, HelpParagraph } from 'components/common/type'
import typography from 'style/typography'
import { sampleText, shortSampleText } from './sample-text'

typography.injectStyles()

storiesOf('Typography', module)
  .add('Paragraph', () => (
    <>
      <p>{sampleText}</p>
      <p>{sampleText}</p>
    </>
  ))
  .add('Headers', () => (
    <>
      <h1>{shortSampleText}</h1>
      <h2>{shortSampleText}</h2>
      <h3>{shortSampleText}</h3>
      <h4>{shortSampleText}</h4>
      <h5>{shortSampleText}</h5>
    </>
  ))
  .add('Lead paragraph', () => <LeadParagraph>{sampleText}</LeadParagraph>)
  .add('Help paragraph', () => <HelpParagraph>{sampleText}</HelpParagraph>)
