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
          # 'components/jquery-waypoints/waypoints.js'
          # 'components/jquery-waypoints/shortcuts/sticky-elements/waypoints-sticky.js'
          # 'components/jquery.transit/jquery.transit.js'
          # 'components/imagesloaded/jquery.imagesloaded.js'
          # 'components/bootstrap/js/bootstrap-affix.js'
          # 'components/bootstrap/js/bootstrap-scrollspy.js'
          # 'assets/js/scrollspy.js'
        ],
        dest: 'public/lib.js'
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
            # 'components/jquery-waypoints/waypoints.js'
            # 'components/jquery-waypoints/shortcuts/sticky-elements/waypoints-sticky.js'
            # 'components/jquery.transit/jquery.transit.js'
            # 'components/imagesloaded/jquery.imagesloaded.js'
            # 'components/bootstrap/js/bootstrap-affix.js'
            # 'components/bootstrap/js/bootstrap-scrollspy.js'
            # 'assets/js/scrollspy.js'
          ]
        }
      }
    }
  }

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'

  grunt.registerTask 'help', ->
    grunt.log.writeln 'grunt lib :', 'Concact and uglify js libs'

  grunt.registerTask 'lib', ['uglify:lib', 'concat']
  grunt.registerTask 'default', ['help']
