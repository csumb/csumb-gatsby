const gatsbyConfig = {
  siteMetadata: {
    title: 'Cal State Monterey Bay',
    fileStack: 'A3ttdsdUR8aGvjvUnJBWUz',
    okta: {
      login:
        'https://csumb.okta.com/home/csumb_csumbbetawebsite_1/0oalhdw605Fe37hnQ0x7/alnlhdyx6zseWNBdS0x7',
    },
    swiftypeId: 'Gu7FdGTPV49T6dsYVBSV',
    olarkSiteId: '1001-610-10-3640',
    schedule: {
      currentTerm: 2194,
      currentTermName: '2019fall',
    },
    labs: {
      customerId: '200b96ee-10c7-4355-83a4-3ded9ab6e845',
      labs: [1001, 1002, 1003, 1005, 1006, 1010, 1009, 1008],
    },
    overridePages: [
      'cost',
      'it',
      'it/alerts',
      'library',
      'library/ask-librarian',
      'about/about-our-students',
      'search',
      'scienceillustration/graduate-gallery',
      'news',
      'about/map-directions',
      'up/all-forms',
      'up/index',
      'undersea/imagery-database',
    ],
    eventCategories: [
      {
        name: 'Arts',
        slug: 'arts',
      },
      {
        name: 'Athletics',
        slug: 'athletics',
      },
      {
        name: 'Conferences',
        slug: 'conferences',
      },
      {
        name: 'Lectures',
        slug: 'lectures',
      },
      {
        name: 'Music',
        slug: 'music',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-csv',
    'gatsby-transformer-remark',
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
          // Science illustration
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
          // University personnel
          {
            baseId: 'appRBrbuxszZziJNY',
            tableName: 'Pages',
            queryName: 'UniversityPersonnelPages',
            tableLinks: ['Documents', 'Parent'],
          },
          {
            baseId: 'appRBrbuxszZziJNY',
            tableName: 'Documents',
            queryName: 'UniversityPersonnelDocuments',
          },
          //Undersea archive
          {
            baseId: 'appzX0a9ppEdDZl1P',
            tableName: 'Regions',
            queryName: 'UnderseaRegions',
          },
          {
            baseId: 'appzX0a9ppEdDZl1P',
            tableName: 'Archives',
            queryName: 'UnderseaArchives',
          },
          {
            baseId: 'appzX0a9ppEdDZl1P',
            tableName: 'MPAs',
            queryName: 'UnderseaMPA',
          },
          //Study abroad
          {
            baseId: 'appXrkUdaBbX4kxG5',
            tableName: 'Partners',
            queryName: 'StudyAbroadPartners',
          },
          {
            baseId: 'appXrkUdaBbX4kxG5',
            tableName: 'Areas',
            queryName: 'StudyAbroadAreas',
            tableLinks: ['Semester/Year Programs'],
          },
          {
            baseId: 'appXrkUdaBbX4kxG5',
            tableName: 'Majors',
            queryName: 'StudyAbroadMajors',
          },
          {
            baseId: 'appXrkUdaBbX4kxG5',
            tableName: 'Application Dealines',
            queryName: 'StudyAbroadDeadlines',
          },
          {
            baseId: 'appXrkUdaBbX4kxG5',
            tableName: 'Campus Services',
            queryName: 'StudyAbroadServices',
          },
          {
            baseId: 'appXrkUdaBbX4kxG5',
            tableName: 'Prerequisites',
            queryName: 'StudyAbroadPrerequisites',
          },
          {
            baseId: 'appXrkUdaBbX4kxG5',
            tableName: 'Program Website feed',
            queryName: 'StudyAbroadProgram',
            tableLinks: [
              'Countries',
              'Partner',
              'Fall/Spring Application Deadline',
              'Summer Application Deadline',
              'Areas',
              'Prerequisites',
              'Campus services',
            ],
          },
          {
            baseId: 'appXrkUdaBbX4kxG5',
            tableName: 'Countries',
            queryName: 'StudyAbroadCountries',
            tableLinks: ['Countries', 'Partners'],
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
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Hind',
            variants: ['300', '400', '700'],
          },
          {
            family: 'Open Sans',
            variants: ['300', '600', '700'],
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/style/typography',
        omitGoogleFont: true,
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['UA-4860091-1'],
        pluginConfig: {
          anonymize_ip: true,
          head: false,
          exclude: ['/preview/**'],
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
        display: 'standalone',
        icon: 'src/assets/images/icon.png',
      },
    },
  ],
}

if (process.env.CI) {
  gatsbyConfig.plugins.push({
    resolve: 'gatsby-plugin-rollbar',
    options: {
      accessToken: 'cede68eb11674ec28cd2da13d1d7a7f6',
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: process.env.TRAVIS_BRANCH,
      },
    },
  })
}

module.exports = gatsbyConfig
