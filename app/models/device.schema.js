var loggerDB = require('winston').loggers.get('database'),
    mongoose = require('mongoose'),
    moment = require('moment'),
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
}, {
    toObject: {
        virtuals: true
    }
});

// add plugins
Device.plugin(cssPlugin, {});
Device.plugin(htmlPlugin, {});
Device.plugin(javascriptPlugin, {});


// virtuals
Device.virtual('created.ago').get(function(){
    return moment(this.created).fromNow();
});

Device.virtual('created.exact').get(function(){
    return moment(this.created).format("MMMM Do YYYY, H:mm:ss");
});


// statics
Device.statics.findBy = function(group, cb){
    var idQuery,
        addSetQuery;

    if(group === 'browsers'){
        addSetQuery = { id: '$_id', name: '$system.name' };
        idQuery = { name: '$agent.family', version: '$agent.version' };
    }

    if(group === 'systems'){
        addSetQuery = { id: '$_id', name: '$agent.name', family: '$agent.family' };
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

Device.statics.findBySystem = function(cb){
    this.aggregate(
        { $group: {
            _id: { sName: '$system.family', aName: '$agent.family', sVersion: '$system.version'  },
            versions: { $addToSet: { id: '$_id', version: '$agent.version' } }
        } },
        { $group: {
            _id: '$_id',
            browsers: { $addToSet: { id: '$_id.aName', versions: '$versions' } }
        }},
        { $group: {
            _id: '$_id.sName',
            versions: { $addToSet: { version: '$_id.sVersion', browsers: '$browsers' } }
        } },
        { $project: {
            _id: 0, system: '$_id', versions: 1
        } },
        cb);
};

Device.post('save', function() {
    loggerDB.info('Device saved to database: ' + this.id);
});

// export Device
module.exports = mongoose.model('Device', Device);