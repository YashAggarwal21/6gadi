const redis = require('redis');
const config = require('config');

let client = redis.createClient(config.get('redis'));
module.exports.redisConnection = client
