var logger = require('winston').loggers.get('system'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    cssPlugin = require('../../app/models/plugin/css.schema'),
    javascriptPlugin = require('../../app/models/plugin/javascript.schema'),
    htmlPlugin = require('../../app/models/plugin/html.schema');


// define device schema
var Device = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    id: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    agent: {
        type: Object, // mongoose type
        family: String,
        major: String,
        minor: String,
        patch: String,
        id: String
    },
    device: Object,
    system: {
        type: Object, // mongoose type
        major: String,
        minor: String,
        patch: String,
        patchMinor: String,
        id: String
    }
});

// add plugins
Device.plugin(cssPlugin, {});
Device.plugin(htmlPlugin, {});
Device.plugin(javascriptPlugin, {});


Device.post('save', function() {
    logger.debug('action:\tDevice saved to database');
});

// export Device
module.exports = mongoose.model('Device', Device);