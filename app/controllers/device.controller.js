var loggerDB = require('winston').loggers.get('database'),
    logger = require('winston').loggers.get('system'),
    device = {},
    Device = require('../../app/models/device.schema'),
    DeviceHelper = require('../../app/helpers/device.helper');


/**
 * DELETE
 */
device.delete = {

    all: function(req, res){
        Device.remove({}, function(err){
            if(err){
                loggerDB.error(err);
                res.json({ }, 500);
            }
            res.json({ }, 204);
        });
    },

    byHash: function(req, res){
        Device.remove({ _id: req.params.device }, function(err){
            if(err){
                loggerDB.error(err);
                res.json({ }, 500);
            }
            res.json({ }, 204);
        });
    }

};

/**
 * GET
 */
device.get = {

    all: function(req, res, next){
        Device.find({},'', function(err, docs){
            res.devices = docs;
            next();
        });
    },

    browserGrouping: function(req, res, next){
        Device.aggregate(
            {
                $group: {
                    _id: '$agent.family',
                    items: {
                        $addToSet : {
                            _id: '$_id',
                            version: '$agent.version'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    family: '$_id',
                    items: 1
                }
            },
            function(err, docs){
                // res.json(docs, 200);
                res.browsers = docs;
                next();
            });
    },

    byAgent: function(req, res, next){
        var ua = req.headers['user-agent'];

        Device.findOne({ id: ua }, function(err, doc){
            if( err ){
                loggerDB.error(err);
                return next( new Error( 'Unable to detect device from database') );
            }
            if(doc){
                res.device = doc.toObject();
                loggerDB.info('Device found by agent: ' + ua);
                res.cookie('device', doc._id, {  maxAge: 900000, signed: true });
            }
            next();
        });
    },

    byHash: function(req, res, next){
        var id = req.params.device;

        Device.findOne({ _id: id }, function(err, docs){
            if( err || !docs){
                loggerDB.error(err);
                return next( new Error( 'Device does not exist') );
            }

            res.device = docs.toObject();
            next();
        });
    }

};

/**
 * POST
 */
device.post = function(req, res, next){
    var ua = req.headers['user-agent'];

    if(ua !== req.body.useragent){
        logger.error('Device user agent mismatch: '+ ua + ' - ' + req.body.useragent);
        // return res.json({ message: 'device user agent does not match post data user agent'}, 500);
    }

    var device = new DeviceHelper(ua, req.body.features);

    Device.create(device, function(err, device){
        if(err){
            loggerDB.error(err);
            res.json({ error: err.err }, 409);
            return;

        }
        res.device = device.toObject();
        res.cookie('device', device._id, {  maxAge: 900000, signed: true });
        res.json({ }, 200);
        next();
    });
};



/**
 * VIEW
 */
device.view = {};

device.view.list = function(req, res){
    return res.render('device/list', {
        browsers: res.browsers || {},
        devices: res.devices || {}
    });
};

device.view.profile = function(req, res){
    return res.render('device/profile', {
        device: res.device || {}
    });
};


module.exports = device;