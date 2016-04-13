var config = {
  username: '',
  password: '',
  host: '127.0.0.1',
  port: '27017',
  database: 'rrpodcasts',
  options: { server: { socketOptions: { keepAlive: 1 } } } 
};

config.uri = 'mongodb://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.database;
config.sessionsUri = config.uri + '/sessions';

module.exports = config;