const loginUrls = {
  develop:
    'https://csumb.okta.com/app/csumb_csumbwebsitedevremote_1/exkmey914mz0RN9060x7/sso/saml',
  master:
    'https://csumb.okta.com/app/csumb_csumbwebsitedevremote_1/exkmey914mz0RN9060x7/sso/saml',
}

const gatsbyConfig = {
  siteMetadata: {
    title: 'Cal State Monterey Bay',
    fileStack: process.env.GATSBY_CSUMB_FILESTACK_KEY,
    okta: {
      login:
        typeof process.env.TRAVIS_BRANCH !== 'undefined' &&
        typeof loginUrls[process.env.TRAVIS_BRANCH] !== 'undefined'
          ? loginUrls[process.env.TRAVIS_BRANCH]
          : 'https://csumb.okta.com/',
    },
    swiftypeId: process.env.GATSBY_CSUMB_SWIFTYPE_ID,
    perSiteOlarkIds: [
      { site: 'dashboard', code: '1001-610-10-3640' },
      { site: 'mist', code: '3836-896-10-1757' },
      { site: 'scd', code: '3836-896-10-1757' },
    ],
    schedule: {
      currentTerm: 2194,
      currentTermName: '2019fall',
    },
    labs: {
      customerId: '200b96ee-10c7-4355-83a4-3ded9ab6e845',
      labs: [1001, 1002, 1003, 1005, 1006, 1010, 1009, 1008],
    },
    overridePages: [
      'about/about-our-students',
      'about/map-directions',
      'cost',
      'housing/compare-housing-options',
      'it',
      'it/alerts',
      'library',
      'library/ask-librarian',
      'news',
      'search',
      'scienceillustration/graduate-gallery',
      'undersea/imagery-database',
      'up/all-forms',
      'up/index',
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
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-csv',
    'gatsby-transformer-remark',
    'gatsby-source-csumb-web-content',
    {
      resolve: 'gatsby-source-csumb-content-api-redirects',
      options: {
        endpoint: process.env.CSUMB_CONTENT_API_ENDPOINT,
      },
    },
    {
      resolve: 'gatsby-source-csumb-content-api-sites',
      options: {
        endpoint: process.env.CSUMB_CONTENT_API_ENDPOINT,
      },
    },
    {
      resolve: 'gatsby-source-csumb-content-api-departments',
      options: {
        endpoint: process.env.CSUMB_CONTENT_API_ENDPOINT,
      },
    },
    {
      resolve: 'gatsby-source-csumb-content-api-navigation',
      options: {
        endpoint: process.env.CSUMB_CONTENT_API_ENDPOINT,
      },
    },
    {
      resolve: 'gatsby-source-csumb-content-api-pages',
      options: {
        endpoint: process.env.CSUMB_CONTENT_API_ENDPOINT,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: 'tomato',
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-polyfill-io',
      options: {
        features: [
          'Array.prototype.map',
          'Array.prototype.find',
          'fetch',
          'Symbol',
        ],
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
            tableLinks: ['Semester/Year_Programs'],
          },
          {
            baseId: 'appXrkUdaBbX4kxG5',
            tableName: 'Majors',
            queryName: 'StudyAbroadMajors',
          },
          {
            baseId: 'appXrkUdaBbX4kxG5',
            tableName: 'Application Deadlines',
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
            tableName: 'Summer Academic Programs',
            queryName: 'StudyAbroadSummerAcademics',
          },
          {
            baseId: 'appXrkUdaBbX4kxG5',
            tableName: 'Summer Program Dates',
            queryName: 'StudyAbroadSummerProgramDates',
          },
          {
            baseId: 'appXrkUdaBbX4kxG5',
            tableName: 'Program Website feed',
            queryName: 'StudyAbroadProgram',
            tableLinks: [
              'Countries',
              'Partner',
              'Fall/Spring_Application_Deadline',
              'Summer_Application_Deadline',
              'Areas',
              'Summer_Academics',
              'Prerequisites',
              'Campus_services',
              'Summer_Program_Dates',
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
        path: './website-data',
        ignore: ['*.json', '**/.json'],
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
        fontDisplay: 'swap',
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
      resolve: 'gatsby-plugin-hotjar',
      options: {
        id: 1234615,
        sv: 6,
      },
    },
    'gatsby-plugin-meta-redirect',
    'gatsby-plugin-csumb-post-build',
  ],
}

module.exports = gatsbyConfig
