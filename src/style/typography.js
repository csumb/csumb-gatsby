import Typography from 'typography'
import { colors } from 'style/theme'

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
    'h2,h3,h4,h5': {
      marginBottom: rhythm(3 / 4),
    },
  }),
}

const typography = new Typography(type)

export default typography
