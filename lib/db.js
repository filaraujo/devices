var clog = require('clog'),
    mongoose = require('mongoose');



mongoose.connect('mongodb://faraujo:obsidian25@ds047107.mongolab.com:47107/devices', function(err) {
    if (err) {
        clog.error('Mongo was unable to connect to cloud db');

        // attempt local
        mongoose.connect('mongodb://localhost/devices', function(err) {
            if(err){
                clog.error('Mongo was unable to connect to local db');
            }
        });
    }
});

// on open
mongoose.connection.on('open', function () {
    clog.debug('Mongo connected.');
});

// on close
mongoose.connection.on('close', function () {
    clog.debug('Mongo closed.');
});