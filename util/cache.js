const redis  = require('./redis');
const _      = require('lodash');

const get = (key, callback) => {
  const t = new Date();
  redis.get(key, (err, data) => {
    if (err) {
      return callback(err);
    }
    if (!data) {
      return callback();
    }
    data = JSON.parse(data);
    const duration = (new Date() - t);
    callback(null, data);
  });
};

exports.get = get;

// time 参数可选，秒为单位
const set = (key, value, time, callback) => {
  const t = new Date();

  if (typeof time === 'function') {
    callback = time;
    time = null;
  }
  callback = callback || _.noop;
  value = JSON.stringify(value);

  if (!time) {
    redis.set(key, value, callback);
  } else {
    redis.setex(key, time, value, callback);
  }
  const duration = (new Date() - t);
};

exports.set = set;

const del = (key) => {
  return redis.del(key);
}

exports.del = del;