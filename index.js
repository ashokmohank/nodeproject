'use strict'

const logger = require('winston')

const type = 'web'

logger.info(`Starting '${type}' process`, { pid: process.pid })

if (type === 'web') {
  require('./web')
} else {
  throw new Error(`
    ${type} is an unsupported process type. 
    Use one of: 'web', 'twitter-stream-worker', 'social-preprocessor-worker'!
  `)
}
