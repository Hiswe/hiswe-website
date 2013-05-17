module.exports = (grunt) ->
  im    = require 'imagemagick'
  path  = require 'path'

  grunt.registerMultiTask 'img_resize', ->
    done      = this.async()
    publicDir = 'public/dynamic'
    images    = []

    originalOptions = this.options()
    # Default options
    options = this.options({
      overwrite: false
      sizeInPath: false
      quality: 0.8
      gravity: 'Center'
      width: 0
      height: 0
    })

    if options.width is 0 and options.height is 0
      return grunt.fail.warn("Neither height nor width defined.");

    this.files.forEach (f) ->
      extname = path.extname(f.dest)
      dirname = path.dirname(f.dest)
      srcPath = f.src[0]

      # Add size in fileName
      if options.sizeInPath is true
        basename = "#{dirname}/#{path.basename(f.dest, extname)}"
        dstPath = "#{basename}-#{options.width}x#{options.height}#{extname}"
      else
        dstPath = f.dest

      # overwrite check
      if options.overwrite is off and grunt.file.isFile(dstPath)
        msg = "Skipping #{srcPath} because destination already exists.\n
Set options 'overwrite' to true to enable overwriting of files."
        return grunt.log.writeln msg

      imOptions = {
        dstFolder:  dirname
        srcPath:    srcPath
        dstPath:    dstPath
        width:      options.width
        height:     options.height
        gravity:    options.gravity
        quality:    options.quality
        format:     extname
      }
      images.push imOptions

    resize = (data, callback) ->
      grunt.file.mkdir data.dstFolder unless grunt.file.exists(data.dstFolder)

      delete data.dstFolder
      delete data.format

      im.crop data, (err, stdout, stderr) ->
        if err
          grunt.fail.warn err.message
        else
          grunt.log.ok "Image #{data.srcPath} resized to #{data.dstPath}"

        callback err


    grunt.util.async.forEachSeries images, resize, (err) ->
      throw err if err
      done()
