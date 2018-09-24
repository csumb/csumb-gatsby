
const path = require(`path`)
const fs = require(`fs-extra`)
require(`gatsby-source-filesystem`)
const coursePages = require(`./src/node/courses`)
const contentPages = require(`./src/node/pages`)


exports.createPages = ({ graphql, actions }) => {
  return new Promise((resolve, reject) => {
    coursePages(graphql, actions).then(() => {
      return contentPages(graphql, actions)
    }).then(() => {
      resolve()
    })
  })
}