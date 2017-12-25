const Redis = require('ioredis');

const client = new Redis({
  port: 6379,
  host: '127.0.0.1',
  db: 0,
  password: 'daerwen666'
});

client.on('error', function (err) {
  if (err) {
    console.error('connect to redis error, check your redis config', err);
    process.exit(1);
  } else {
  	console.log('connect 成功')
  }
})

exports = module.exports = client;