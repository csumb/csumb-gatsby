const footer =require('./src/config/footer')

module.exports = {
  siteMetadata: {
    title: `Cal State Monterey Bay`,
    footer: footer,
    okta: {
      login: `https://csumb.okta.com`
    },
    swiftypeId: `Gu7FdGTPV49T6dsYVBSV`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-source-csumb-content`,
      options: {
        path: `_web-content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./_data`,
      },
    },
    {
      resolve: `gatsby-source-google-public-sheet`,
      options: {
        sheet: `https://spreadsheets.google.com/feeds/list/1jtwi1CnRBt2JzfoZVSPngmkaucVpw0aZ_WSKIceXlMw/od6/public/values?alt=json`,
        id: `academicPrograms`,
        fields: [
          `type`,
          `name`,
          `program`,
          `link`,
          `description`
        ]
      }
    },
    /*
    ENABLE BEFORE GO LIVE
    {
      resolve: "gatsby-plugin-guess-js",
      options: {
        // Find the view id in the GA admin in a section labeled "views"
        GAViewID: `9784827`,
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
