var winston = require('winston');

module.exports = function(log){

    log = log || 'debug';

    winston.loggers.add('system', {
        console: {
            colorize: true,
            level: log,
            label: 'system'
        }
    });

    winston.loggers.add('database', {
        console: {
            colorize: true,
            level: log,
            label: 'system'
        }
    });

    return winston;
};