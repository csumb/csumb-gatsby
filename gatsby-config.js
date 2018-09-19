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
    {
      resolve: 'gatsby-source-google-sheets',
      options: {
          spreadsheetId: '1jtwi1CnRBt2JzfoZVSPngmkaucVpw0aZ_WSKIceXlMw',
          worksheetTitle: 'Sheet1',
          credentials: require('./drive-api.json')
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Cal State Monterey Bay",
        short_name: "CSUMB",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#fff",
        display: "minimal-ui",
        icon: "src/assets/images/icon.png", // This path is relative to the root of the site.
      },
    }
  ],
}
