module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    clean: ['_data', '_web-content'],
    gitclone: {
      data: {
        options: {
          repository: `https://${
            process.env.GITHUB_TOKEN
            }@github.com/csumb/web-data.git`,
          directory: '_data',
          depth: 1,
        },
      },
      content: {
        options: {
          repository: `https://${
            process.env.GITHUB_TOKEN
            }@github.com/csumb/web-content.git`,
          directory: '_web-content',
          depth: 1,
        },
      },
      testing: {
        options: {
          branch: 'testing',
          repository: `https://${
            process.env.GITHUB_TOKEN
            }@github.com/csumb/web-content.git`,
          directory: '_web-content',
          depth: 1,
        },
      },
    },
  })

  grunt.loadNpmTasks('grunt-git')
  grunt.loadNpmTasks('grunt-contrib-clean')

  // Default task(s).
  grunt.registerTask('default', ['clean', 'gitclone:data', 'gitclone:content'])
  grunt.registerTask('testing', ['clean', 'gitclone:data', 'gitclone:testing'])
}
