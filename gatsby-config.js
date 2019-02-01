module.exports = {
  siteMetadata: {
    title: 'Cal State Monterey Bay',
    fileStack: 'A3ttdsdUR8aGvjvUnJBWUz',
    okta: {
      login:
        'https://csumb.okta.com/home/csumb_csumbbetawebsite_1/0oalhdw605Fe37hnQ0x7/alnlhdyx6zseWNBdS0x7',
    },
    swiftypeId: 'Gu7FdGTPV49T6dsYVBSV',
    schedule: {
      currentTerm: 2184,
      currentTermName: '2018fall',
      endpoint: 'https://api.csumb.edu/schedule/',
    },
    labs: {
      customerId: '200b96ee-10c7-4355-83a4-3ded9ab6e845',
      labs: [1001, 1002, 1003, 1005, 1006, 1010, 1009, 1008],
    },
    overridePages: [
      'cost',
      'it',
      'library',
      'about/about-our-students',
      'search',
      'scienceillustration/graduate-gallery',
    ],
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-csv',
    'gatsby-transformer-remark',
    'gatsby-plugin-catch-links',
    'gatsby-source-csumb-web-content',
    {
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_SCIENCEILLUSTRATION,
        tables: [
          {
            baseId: 'appW5yp8SpOvxD3Al',
            tableName: 'Graduates',
          },
          {
            baseId: 'appW5yp8SpOvxD3Al',
            tableName: 'Images',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CSUMB_NAV_CONTENTFUL_SPACE,
        accessToken: process.env.CSUMB_NAV_CONTENTFUL_TOKEN,
      },
    },

    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CSUMB_HOME_CONTENTFUL_SPACE,
        accessToken: process.env.CSUMB_HOME_CONTENTFUL_TOKEN,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './_data',
        ignore: ['**/.*'],
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/static',
        name: 'static-content',
      },
    },
    {
      resolve: 'gatsby-source-google-public-sheet',
      options: {
        sheet:
          'https://spreadsheets.google.com/feeds/list/1jtwi1CnRBt2JzfoZVSPngmkaucVpw0aZ_WSKIceXlMw/od6/public/values?alt=json',
        id: 'academicPrograms',
        fields: ['type', 'name', 'program', 'link', 'description'],
      },
    },
    /*
    ENABLE BEFORE GO LIVE
    {
      resolve: "gatsby-plugin-guess-js",
      options: {
        // Find the view id in the GA admin in a section labeled "views"
        GAViewID: '9784827',
        minimumThreshold: 0.03,
        // The "period" for fetching analytic data.
        period: {
          startDate: new Date("2018-1-1"),
          endDate: new Date(),
        },
      },
    },*/
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Hind',
          },
          {
            family: 'Open Sans',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
        // omitGoogleFont: true   <--- turn back on for production!
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-4860091-14',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: [],
      },
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/assets/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Cal State Monterey Bay',
        short_name: 'CSUMB',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fff',
        display: 'minimal-ui',
        icon: 'src/assets/images/icon.png', // This path is relative to the root of the site.
      },
    },
  ],
}
