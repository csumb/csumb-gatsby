module.exports = {
  siteMetadata: {
    title: 'Cal State Monterey Bay',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./_web-content`,
      },
    },
  ],
}
