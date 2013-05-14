module.exports = (grunt) ->
  grunt.initConfig {
    pkg: grunt.file.readJSON('package.json')
    concat: {
      options: {
        separator: ';\n'
      },
      dist: {
        src: [
          'components/jquery/jquery.js'
          # 'components/jquery.transit/jquery.transit.js'
          # 'components/imagesloaded/jquery.imagesloaded.js'
        ],
        dest: 'public/lib.js'
      }
    }
    copy: {
      font: {
        files: [{
          expand: true
          cwd: 'components/hiso-font/'
          src: ['font/**']
          dest: 'public/media/'}]
      }
    }
    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        }
      }
      lib: {
        files: {
          'public/lib.min.js': [
            'components/jquery/jquery.js'
            # 'components/jquery.transit/jquery.transit.js'
            # 'components/imagesloaded/jquery.imagesloaded.js'
          ]
        }
      }
    }
  }

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-copy'

  grunt.registerTask 'help', ->
    grunt.log.writeln 'grunt lib :', 'Concact and uglify js libs'

  grunt.registerTask 'lib', ['uglify:lib', 'concat']
  grunt.registerTask 'default', ['help']
