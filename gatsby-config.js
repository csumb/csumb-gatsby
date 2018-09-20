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
      resolve: 'gatsby-source-http',
      options: {
        url: `https://spreadsheets.google.com/feeds/list/1jtwi1CnRBt2JzfoZVSPngmkaucVpw0aZ_WSKIceXlMw/od6/public/values?alt=json`,
        id: `academicPrograms`,
        json: true,
        fetchOptions: {

        }
      }
    },
    `gatsby-transformer-json`,
    /*
    ENABLE BEFORE GO LIVE
    {
      resolve: "gatsby-plugin-guess-js",
      options: {
        // Find the view id in the GA admin in a section labeled "views"
        GAViewID: `VIEW_ID`,
        minimumThreshold: 0.03,
        // The "period" for fetching analytic data.
        period: {
          startDate: new Date("2018-1-1"),
          endDate: new Date(),
        },
      },
    },*/
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
