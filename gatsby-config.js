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
      currentTerm: 2192,
      currentTermName: '2019spring',
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
      'news',
      'about/map-directions',
    ],
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-csv',
    'gatsby-transformer-remark',
    'gatsby-plugin-catch-links',
    'gatsby-source-csumb-directory',
    'gatsby-source-csumb-web-content',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: 'tomato',
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [`Array.prototype.map`, `fetch`],
      },
    },
    {
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_KEY,
        tables: [
          {
            baseId: 'appW5yp8SpOvxD3Al',
            tableName: 'Graduates',
            queryName: 'ScienceIllustrationGraduates',
          },
          {
            baseId: 'appW5yp8SpOvxD3Al',
            tableName: 'Images',
            queryName: 'ScienceIllustrationImages',
          },
          {
            baseId: 'appRBrbuxszZziJNY',
            tableName: 'Pages',
            queryName: 'UniversityPersonnelPages',
          },
          {
            baseId: 'appRBrbuxszZziJNY',
            tableName: 'Documents',
            queryName: 'UniversityPersonnelDocuments',
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
        pathToConfigModule: 'src/style/typography',
        // omitGoogleFont: true   <--- turn back on for production!
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['UA-4860091-1'],
        pluginConfig: {
          anonymize_ip: true,
          head: false,
          exclude: ['/preview/**', '/do-not-track/me/too/'],
        },
        gtagConfig: {
          respectDNT: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/assets/images/favicon.png',
      },
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: 1234615,
        sv: 6,
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
