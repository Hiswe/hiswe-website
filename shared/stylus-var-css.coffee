stylus  = require('stylus')
parse   = require('color-parser')

# convert colors to stylus usable colors
cssConf = {}
for key, value of require('./stylus-var')
  if /^#.*/.test value
    color = parse(value)
    cssConf[key] = new stylus.nodes.RGBA(color.r, color.g, color.b, 1)
  else
    cssConf[key] = value

module.exports = cssConf
