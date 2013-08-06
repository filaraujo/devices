var clog = require('clog'),
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
                res.json({ }, 500);
            }
            res.json({ }, 204);
        });
    },

    byHash: function(req, res){
        Device.remove({ _id: req.params.device }, function(err){
            if(err){
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

    byAgent: function(req, res, next){
        var ua = req.headers['user-agent'];

        Device.findOne({ id: ua }, function(err, docs){
            if( err ){
                return next( new Error( 'Unable to detect device from database') );
            }
            if(docs){
                docs = docs.toObject();
                clog.info('Device found by agent: ' + ua);
            }
            res.device = docs;
            next();
        });
    },

    byHash: function(req, res, next){
        var id = req.params.device;

        Device.findOne({ _id: id }, function(err, docs){
            if( err || !docs){
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
        res.json({ message: 'device user agent does not match post data user agent'}, 500);
    }

    var device = new DeviceHelper(ua, req.body.tests);

    new Device(device).save(function(err){
        if(err){
            clog.error(err);
            res.json({ error: err.err }, 409);
            return;

        }
        clog.info('Device saved: ' + ua);
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
        devices: res.devices || {}
    });
};

device.view.profile = function(req, res){
    return res.render('device/profile', {
        device: res.device || {}
    });
};


module.exports = device;