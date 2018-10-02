
const path = require(`path`)
const fs = require(`fs-extra`)
const coursePages = require(`./src/node/courses`)
const contentPages = require(`./src/node/pages`)
const schedulePages = require(`./src/node/schedule`)
require(`gatsby-source-filesystem`)


exports.createPages = ({ graphql, actions }) => {
  return new Promise((resolve, reject) => {
    coursePages(graphql, actions).then(() => {
      return contentPages(graphql, actions)
    }).then(() => {
      return schedulePages(graphql, actions)
    }).then(() => {
      resolve()
    })
  })
}