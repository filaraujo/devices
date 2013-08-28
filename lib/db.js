var logger = require('winston').loggers.get('system'),
    mongoose = require('mongoose'),
    env;



// attempt local
mongoose.connect('mongodb://localhost/devices', function(err) {
    if (err) {
        logger.error('Mongo was unable to connect to local db');

        // attempt cloud
        mongoose.connect('mongodb://faraujo:obsidian25@paulo.mongohq.com:10023/devices', function(err) {
            if(err){
                logger.error('Mongo was unable to connect to cloud db');
            }
            env = 'cloud';
        });
    }
    env = 'local';
});

// on open
mongoose.connection.on('open', function () {
    logger.info('Mongo connected to '+env+' db');
});

// on close
mongoose.connection.on('close', function () {
    logger.info('Mongo closed.');
});