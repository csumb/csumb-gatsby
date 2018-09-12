module.exports = {
  siteMetadata: {
    title: 'Cal State Monterey Bay',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./_web-content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./_data`,
      },
    },
  ],
}
