const footer =require('./src/config/footer')

module.exports = {
  siteMetadata: {
    title: `Cal State Monterey Bay`,
    footer: footer,
    okta: {
      login: `https://csumb.okta.com`
    },
    swiftypeId: `Gu7FdGTPV49T6dsYVBSV`,
    schedule: {
      currentTerm: 2184,
      currentTermName: '2018fall',
      endpoint: `https://api.csumb.edu/schedule/`
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-csv`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-csumb-content`,
    /*{
      resolve: `gatsby-source-okta`,
      options : {
        filter: {
          limit: 10,
          search: 'profile.cmsRole eq "employee_staff"',
        },
        fields: [
          'firstName',
          'lastName',
          'email'
        ]
      }
    },*/
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            variants: [`400`, `700`]
          },
          {
            family: `Open Sans`,
            variants: [`400`, `700`]
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./_data`,
        ignore: [`**/\.*`]
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./_web-content`,
        name: `web-content`,
        ignore: [`**/\.*`]
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/static`,
        name: `static-content`
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
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/assets/images/favicon.png",
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
