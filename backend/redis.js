const redis = require('redis')

const redisClient = redis.createClient({
  url: 'redis://redis:6379',
  legacyMode: true,
})

redisClient.connect().catch(console.error)

module.exports = redisClient
