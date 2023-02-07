const Redis = require('ioredis');

const redis = new Redis({
    host: 'redis-10647.c60.us-west-1-2.ec2.cloud.redislabs.com',
    port: 10647,
    password: 'xRM3NuYeQ3PRWYnTxnqGywCL8dzUKpy8'
});

module.exports = redis