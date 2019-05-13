const path = require(`path`)
const fs = require(`fs-extra`)
const coursePages = require(`./src/node/courses`)
const redirects = require('./src/node/redirects')
const contentPages = require(`./src/node/pages`)
const schedulePages = require(`./src/node/schedule`)
const buildingPages = require(`./src/node/buildings`)
const directoryPages = require(`./src/node/directory`)
const everythingPages = require(`./src/node/everything`)
const eventPages = require(`./src/node/events`)
const scienceIllustrationPages = require(`./src/node/departments/scienceillustration`)
//const educationAbroadPages = require(`./src/node/departments/educationabroad`)
const newsStoryPages = require(`./src/node/departments/news`)

require(`gatsby-source-filesystem`)

exports.createPages = ({ stage, graphql, actions }) => {
  return new Promise((resolve, reject) => {
    coursePages(graphql, actions)
      .then(() => {
        return newsStoryPages(graphql, actions)
      })
      .then(() => {
        return scienceIllustrationPages(graphql, actions)
      }) /*
      .then(() => {
        return educationAbroadPages(graphql, actions)
      })*/
      .then(() => {
        return contentPages(graphql, actions)
      })
      .then(() => {
        return everythingPages(graphql, actions)
      })
      .then(() => {
        return eventPages(graphql, actions)
      })
      .then(() => {
        return directoryPages(graphql, actions)
      })
      .then(() => {
        return buildingPages(graphql, actions)
      })
      .then(() => {
        return schedulePages(graphql, actions)
      })
      .then(() => {
        return redirects(graphql, actions)
      })
      .then(() => {
        resolve()
      })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  const { setWebpackConfig } = actions

  if (stage === 'build-html') {
    setWebpackConfig({
      module: {
        rules: [
          {
            test: /filestack-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve('./src'), path.resolve('./node_modules')],
    },
  })
}
