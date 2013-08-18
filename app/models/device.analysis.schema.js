var loggerDB = require('winston').loggers.get('database'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    cssPlugin = require('../../app/models/plugin/css.schema'),
    javascriptPlugin = require('../../app/models/plugin/javascript.schema'),
    htmlPlugin = require('../../app/models/plugin/html.schema');


// define device schema
var Device = new Schema({
    id: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    reference: {
        type: Schema.Types.ObjectId,
        ref: 'Device',
        unique: true,
        require: true,
    },
    updated: {
        type: Date,
        default: Date.now
    },
    updatedCount: {
        type: Number,
        default: 1
    }
});

// set pluginOptions
var pluginOpts = {
    analysis: true
};

// add plugins
Device.plugin(cssPlugin, pluginOpts);
Device.plugin(htmlPlugin, pluginOpts);
Device.plugin(javascriptPlugin, pluginOpts);


Device.post('save', function() {
    loggerDB.info('Analysis saved to database: ' + this.id);
});

// export DeviceAnalysis
module.exports = mongoose.model('DeviceAnalysis', Device);