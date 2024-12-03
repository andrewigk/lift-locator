const Redis = require('ioredis')

const redis = new Redis(process.env.REDIS_URL || 'redis://redis:6379')

module.exports = redis
