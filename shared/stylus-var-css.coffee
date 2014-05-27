stylus  = require('stylus')
parse   = require('color-parser')

# convert colors to stylus usable colors
cssConf = {}
for key, value of require('./stylus-var')
  if typeof value is 'object'
    cssConf[key] = new stylus.nodes.RGBA(value.r, value.g, value.b, 1)
  else
    cssConf[key] = value

module.exports = cssConf
