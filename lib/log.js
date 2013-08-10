var winston = require('winston');

winston.loggers.add('system', {
    console: {
        colorize: true,
        label: 'system'
    }
});



winston.loggers.add('database', {
    console: {
        colorize: true,
        label: 'system'
    }
});