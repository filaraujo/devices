var winston = require('winston');

winston.loggers.add('system', {
    console: {
        colorize: true,
        level: 'debug',
        label: 'system'
    }
});

winston.loggers.add('database', {
    console: {
        colorize: true,
        level: 'debug',
        label: 'database'
    }
});