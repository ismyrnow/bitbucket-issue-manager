'use strict';
var fs = require('fs');
var path = require('path');
var bunyan = require('bunyan');

var log = bunyan.createLogger({ name: 'auto-load-routers' });

/**
 * Mounts all of the routes defined in a directory, using the module paths
 * to dictate the mount path. All '.js' files in the directory should be
 * modules that export an Express.Router().
 */
module.exports = function (app, pathToRoutes) {
  var modulePaths = getModulesInDirectory(pathToRoutes);
  var normalizedRoutesPath = path.normalize(pathToRoutes).replace(/\\/g, '/');
  var routePath;
  var resolvedModulePath;

  modulePaths.forEach(function (modulePath) {
    routePath = modulePath.replace(normalizedRoutesPath, '');
    resolvedModulePath = path.resolve(process.cwd(), modulePath);

    log.info('Mounting router at \'' + routePath + '\'');

    app.use(routePath, require(resolvedModulePath));
  });
};

/**
 * Synchronously recurses a directory and it's subdirectories, returning
 * an array of files found with the '.js' extension. Path seperators will
 * be normalized to forward slashes.
 *
 * E.g. fn('./startDir') => [{ 'dirA/dirB/module1', ...]
 *
 * @returns {Array} module paths
 */
function getModulesInDirectory(dir) {
  var files = fs.readdirSync(dir);
  var modulePaths = [];
  var stat, modulePath, filePath;

  files.forEach(function (fileName) {

    filePath = path.join(dir, fileName);
    stat = fs.statSync(filePath);

    if (stat.isFile() && path.extname(fileName) === '.js') {
      modulePath = filePath.slice(0, -3).replace(/\\/g, '/');
      modulePaths.push(modulePath);
    } else if (stat.isDirectory()) {
      modulePaths = modulePaths.concat(getModulesInDirectory(filePath));
    }

  });

  return modulePaths;
}
