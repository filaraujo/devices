var loggerDB = require('winston').loggers.get('database'),
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
        version: String,
        name: String
    },
    device: Object,
    system: {
        type: Object, // mongoose type
        major: String,
        minor: String,
        patch: String,
        patchMinor: String,
        version: String,
        name: String
    }
});

// add plugins
Device.plugin(cssPlugin, {});
Device.plugin(htmlPlugin, {});
Device.plugin(javascriptPlugin, {});


// statics
Device.statics.findBy = function(group, cb){
    var idQuery,
        addSetQuery;

    if(group === 'browsers'){
        addSetQuery = { id: '$_id', name: '$system.name' };
        idQuery = { name: '$agent.family', version: '$agent.version' };
    }

    if(group === 'systems'){
        addSetQuery = { id: '$_id', name: '$agent.name' };
        idQuery = { name: '$system.family', version: '$system.version' };
    }


    this.aggregate(
        { $group: {
            _id: idQuery,
            versions: {
                $addToSet: addSetQuery
            }
        } },
        { $group: {
            _id: '$_id.name',
            versions: {
                $addToSet : { version: '$_id.version', items: '$versions' }
            }
        } },
        { $project: { _id: 0, family: '$_id', versions: 1 } },
        { $sort: { family: 1 } },
        cb);
};


Device.post('save', function() {
    loggerDB.info('Device saved to database: ' + this.id);
});

// export Device
module.exports = mongoose.model('Device', Device);