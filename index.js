'use strict'

const bunyan = require('bunyan')
const config = require('config')
const type = 'web'

var log = bunyan.createLogger({name: 'myapp'});

log.info(`Starting '${type}' process`, { pid: process.pid })

if (type === 'web') {
  require('./web')
} else {
  throw new Error(`
    ${type} is an unsupported process type. 
    Use one of: 'web', 'twitter-stream-worker', 'social-preprocessor-worker'!
  `)
}
