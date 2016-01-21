var config = {
  username: 'rrpodcast',
  password: 'rrpodcast',
  host: 'ds051873.mongolab.com',
  port: '51873',
  database: 'rrpodcast',
  options: { server: { socketOptions: { keepAlive: 1 } } } // see http://mongoosejs.com/docs/connections.html
};

config.uri = 'mongodb://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.database;
config.sessionsUri = config.uri + '/sessions';

module.exports = config;