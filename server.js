var injection = require('allcountjs');
//var injection = require('../allcountjs/allcount-server.js');
var path = require('path');
injection.bindFactory('Config', require('./config.js'));
var Config = injection.inject('Config');
injection.bindFactory('Console', console);
var Console = injection.inject("Console");

injection.bindFactory('port', Config.port);
injection.bindFactory('dbUrl', Config.db_url);
injection.bindFactory('gitRepoUrl', './app-config');
injection.bindFactory('ModelHelper', require('./services/model-helper.js'))
injection.bindFactory('UserRightsHelper', require('./services/user-rights-helper.js'))

injection.bindMultiple('viewPaths', ['myViewPathProvider']);
injection.bindFactory('myViewPathProvider', function () {
  return [path.join(__dirname, 'app-config/views')];
});

var server = injection.inject('allcountServerStartup');


server.startup(function (errors) {
  if (errors) {
    throw new Error(errors.join('\n'));
  }
  console.log('*** Server running on ', Config.port);
  console.log('*** Database used ', Config.db_url);


});
