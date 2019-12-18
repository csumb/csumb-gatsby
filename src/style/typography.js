import Typography from 'typography'
import { colors } from './theme'

const type = {
  baseFontSize: '20px',
  baseLineHeight: 1.5,
  googleFonts: [
    {
      name: 'Open Sans',
      styles: ['300', '600', '700'],
    },
    {
      name: 'Hind',
      styles: ['300', '400', '700'],
    },
  ],
  headerFontFamily: [
    'Open Sans',
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    'Nimbus Sans L',
    'sans-serif',
  ],
  bodyFontFamily: [
    'Hind',
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    'Nimbus Sans L',
    'sans-serif',
  ],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    'a,a:visited': {
      color: colors.primary.default,
    },
    form: {
      margin: 0,
    },
    p: {
      marginBottom: '1.25em',
    },
    'h2,h3,h4,h5,h6': {
      margin: '1.75rem 0 1rem',
      lineHeight: 1.15,
      letterSpacing: '-1px',
    },
    h1: {
      marginTop: 0,
      fontSize: '2.488em',
    },
    h2: {
      fontSize: '2.074em',
    },
    h3: {
      fontSize: '1.728em',
    },
    h4: {
      fontSize: '1.44em',
    },
    h5: {
      fontSize: '1.2em',
    },
  }),
}

const typography = new Typography(type)

export default typography
