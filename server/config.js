import rc from 'rc'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const pkg = require('../package.json')

const config = rc(`hiswe`, {})

config.VERSION = pkg.version

config.HOST = config.HOST || process.env.HOST || `127.0.0.1`
config.PORT = config.PORT || process.env.PORT || 3000

config.NODE_ENV = config.NODE_ENV || process.env.NODE_ENV || `development`
config.isDev = config.NODE_ENV === `development`
config.isProd = config.NODE_ENV === `production`

export default config
