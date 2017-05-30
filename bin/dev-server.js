const project = require('../project.config');
const server = require('../server/main');
const debug = require('debug')('app:bin:dev-server');

server.listen(project.port);
debug(`Server is now running at http://localhost:${project.port}.`);
