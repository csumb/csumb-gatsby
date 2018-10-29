import Typography from 'typography'
import usWebDesignStandardsTheme from 'typography-theme-us-web-design-standards'
import theme from '../components/styles/theme'

usWebDesignStandardsTheme.overrideThemeStyles = () => ({
  'a,a:visited': {
    color: theme.colors.primary.default,
  },
})

const typography = new Typography(usWebDesignStandardsTheme)

export default typography
