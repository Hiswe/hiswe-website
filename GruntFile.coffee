module.exports = (grunt) ->
  grunt.initConfig {
    pkg: grunt.file.readJSON('package.json')
    concat: {
      options: {
        separator: ';\n'
      },
      dist: {
        src: [
          'components/modernizr/modernizr.js'
          'components/jquery/jquery.js'
          'components/hevent/build/jquery.hevent.js'
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
          cwd: 'components/HisoFont/'
          src: ['font/**']
          dest: 'public/media/'
        }]
      }
    }
    uglify: {
      options: {
        mangle: {
          except: ['jQuery', 'Modernizr']
        }
      }
      lib: {
        files: {
          'public/lib.min.js': [
            'components/modernizr/modernizr.js'
            'components/jquery/jquery.js'
            'components/hevent/build/jquery.hevent.js'
            # 'components/jquery.transit/jquery.transit.js'
            # 'components/imagesloaded/jquery.imagesloaded.js'
          ]
        }
      }
    }
    img_resize: {
      work: {
        options: {
          width: 294
        }
        files: [{
          expand: true
          cwd: 'public/media/source'
          src: ['**']
          dest: 'public/media/images'
          filter: 'isFile'
        }]
      }
    }
  }

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadTasks 'grunt-tasks'

  grunt.registerTask 'help', ->
    grunt.log.writeln 'grunt lib :', 'Concact and uglify js libs'
    grunt.log.writeln 'grunt img :', 'Resize images'
    grunt.log.writeln 'grunt font :', 'Copy font to public dir'

  grunt.registerTask 'lib', ['uglify:lib', 'concat']
  grunt.registerTask 'img', ['img_resize:work']
  grunt.registerTask 'font', ['copy:font']
  grunt.registerTask 'default', ['help']
