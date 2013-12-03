var loggerDB = require('winston').loggers.get('database'),
    logger = require('winston').loggers.get('system'),
    device = {},
    Device = require('../../app/models/device.schema'),
    DeviceHelper = require('../../app/helpers/device.helper');


/**
 * DELETE
 */
device.delete = {

    all: function (req, res) {
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

    browsers: function(req, res, next){
        Device.findBy('browsers', function(err, docs){
            // res.json(docs, 200);
            res.devices = docs;
            res.grouping = 'browsers';
            next();
        });
    },

    byAgent: function(req, res, next){
        var ua = req.headers['user-agent'];

        Device.findOne({ id: ua }, function(err, doc){
            if( err ){
                loggerDB.error(err);
                next( new Error( 'Unable to detect device from database') );
                return;
            }
            if(doc){
                res.device = doc.toObject();
                loggerDB.info('Device found by agent: ' + ua);
                // res.cookie('device', doc._id, {  maxAge: 900000, signed: true });
            }
            next();
        });
    },

    byHash: function(req, res, next){
        var id = req.params.device;

        Device.findOne({ _id: id }, function(err, docs){
            if(err){
                loggerDB.error(err);
                return next( new Error( 'Device does not exist') );
            }
            if(!docs){
                return next();
            }

            res.device = docs.toObject();
            next();
        });
    },

    systems: function(req, res, next){
        Device.findBySystem(function(err, docs){
            res.json(docs, 200);
            res.devices = docs;
            res.grouping = 'systems';
            next();
        });
    }

};

/**
 * POST
 */
device.post = function(req, res, next){
    var ua = req.headers['user-agent'];

    console.log(req.body.features);

    if(ua !== req.body.useragent){
        logger.error('Device user agent mismatch: '+ ua + ' - ' + req.body.useragent);
        // return res.json({ message: 'device user agent does not match post data user agent'}, 500);
    }

    var device = new DeviceHelper(ua, req.body.features);

    console.log(device)

    Device.create(device, function(err, device){
        if(err){
            loggerDB.error(err);
            res.json({ error: err.err }, 409);
            return;
        }
        loggerDB.info('Device saved to database: ' + device.id);

        res.device = device.toObject();
        res.json({ id: device._id }, 200);
    });
};



/**
 * VIEW
 */
device.view = {};

device.view.list = function(req, res){
    return res.render('device/list', {
        grouping: res.grouping || undefined,
        devices: res.devices || {}
    });
};

device.view.capture = function(req, res){
    if(res.device){
        res.redirect('/device/'+res.device._id);
    }
    return res.render('device/capture', {
        device: res.device || {},
        features: require('../../app/assets/vendor/modernizr/modernizr-features.json').features
    });
};

device.view.profile = function(req, res){
    return res.render('device/profile', {
        device: res.device || {}
    });
};


module.exports = device;