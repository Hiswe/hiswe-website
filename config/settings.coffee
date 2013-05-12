nconf   = require 'nconf'
path    = require 'path'

log     = '[CONF]'

nconf.overrides {
  'path': path.join __dirname, '/../'
}

# Set env variables to nConf
nconf.env()

currentEnv  = nconf.get('NODE_ENV') or 'development'

# Add a memory storage
# No file storage: not workin on heroku read-only file system
# Conf should be set in .env
nconf.use('memory')

nconf.set('isProd', currentEnv is 'production')

console.log "#{log} current environment is".prompt, currentEnv

nconf.save()
