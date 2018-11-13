const path = require(`path`)
const fs = require(`fs-extra`)
const coursePages = require(`./src/node/courses`)
const contentPages = require(`./src/node/pages`)
const schedulePages = require(`./src/node/schedule`)
const buildingPages = require(`./src/node/buildings`)
const directoryPages = require(`./src/node/directory`)

require(`gatsby-source-filesystem`)

exports.createPages = ({ stage, graphql, actions }) => {
  return new Promise((resolve, reject) => {
    coursePages(graphql, actions)
      .then(() => {
        return contentPages(graphql, actions)
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
        resolve()
      })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /filestack-js/,
            use: loaders.null(),
          },
          {
            test: /iron-db/,
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
