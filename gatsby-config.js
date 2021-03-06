require('dotenv').config()

const gatsbyConfig = {
  siteMetadata: {
    title: 'Cal State Monterey Bay',
    disableAlumni: false,
    disableApplicant: false,
    fileStack: process.env.GATSBY_CSUMB_FILESTACK_KEY,
    showTitleNineMessage: true,
    okta: {
      login:
        'https://csumb.okta.com/home/csumb_csumbnetlify_1/0oanh9wep6JjS3Dl50x7/alnnh9z96oZ4ijHTY0x7',
    },
    swiftypeId: process.env.GATSBY_CSUMB_SWIFTYPE_ID,
    perSiteOlarkIds: [
      { site: 'mist', code: '3836-896-10-1757' },
      { site: 'csonline', code: '5896-465-10-2924' },
      { site: 'business', code: '5564-506-10-6160' },
    ],
    perSiteSerenovaIds: [
      {
        site: 'admissions',
        code: '5f3533b7b95b53000cd78fc2',
        greetingText: `Hi, thank you for reaching out the office of Admissions. To start off we'd like to know a little bit more about you`,
        confirmationText: `Thanks for your email`,
      },
      {
        site: 'it',
        code: '5f3533d47cf37f000ee14e41',
        greetingText: `Hi, welcome to the CSUMB Technology Support Services chat. We are here to help you with your technology questions. To start off we'd like to know a little bit more about you`,
        confirmationText: `Thanks for your name `,
      },
      {
        site: 'csc',
        code: '5f3533e9cdb903000d95fd43',
        greetingText: `Hello, You have reached the Campus Service Center`,
        confirmationText: `Thanks for your name`,
      },
      {
        site: 'cost',
        code: '5f3533e9cdb903000d95fd43',
        greetingText: `Hello, You have reached the Campus Service Center`,
        confirmationText: `Thanks for your name`,
      },
      {
        site: 'dashboard',
        code: '5f3533e9cdb903000d95fd43',
        greetingText: `Hello, You have reached the Campus Service Center`,
        confirmationText: `Thanks for your name`,
      },
    ],
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
      'library/articles-databases',
      'police/emergency',
      'search',
      'scienceillustration/graduate-gallery',
      'undersea/imagery-database',
      'planning/diploma',
      'planning/diploma-validation',
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
            defaultValues: {
              // set default values so GraphQL knows these fields exist
              Alert: '',
              Alert_Link_Text: '',
              Alert_Link_URL: '',
            },
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
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Hind:300,400,700', 'Open Sans:300,600,700'],
        display: 'swap',
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
        id: 1194959,
        sv: 6,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        allPageHeaders: [
          `Referrer-Policy: strict-origin-when-cross-origin`,
          `Content-Security-Policy: frame-ancestors 'self' https://csumb.tfaforms.net`,
          `X-Frame-Options: ALLOW-FROM https://csumb.tfaforms.net`,
        ],
      },
    },
    'gatsby-plugin-csumb-post-build',
  ],
}

module.exports = gatsbyConfig
