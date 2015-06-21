/* eslint no-console:0 */
'use strict';

// Initialize environment variables.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;

var server = require('./server');
var env = process.env.NODE_ENV;
var port = process.env.PORT;

server.listen(port, function () {
  console.log('Server listening on port %d under %s environment.', port, env);
});
