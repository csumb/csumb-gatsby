import Typography from 'typography'
import usWebDesignStandardsTheme from 'typography-theme-us-web-design-standards'
import { colors } from 'components/styles/theme'

usWebDesignStandardsTheme.baseFontSize = '20px'

usWebDesignStandardsTheme.overrideThemeStyles = () => ({
  'a,a:visited': {
    color: colors.primary.default,
  },
})

const typography = new Typography(usWebDesignStandardsTheme)

export default typography
