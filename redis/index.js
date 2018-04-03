const redis = require('redis')

const client = redis.createClient({
  host: 'redis', // connect to redis container
})
client.on('error', (err) => {
  console.error(err)
  process.exit(1)
})

module.exports = client
