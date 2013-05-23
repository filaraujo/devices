var clog = require('clog'),
    device = {},
    Device = require('../../app/models/device.schema'),
    DeviceHelper = require('../../app/helpers/device.helper'),
    uaParser = require('ua-parser');


device.getDevice = function (req, res, next) {
    var ua = req.headers['user-agent'],
        device = uaParser.parse(ua);

    Device.getDevice(ua, function(err, docs){
        if( err ){
            return next( new Error( 'Unable to detect device from database') );
        }

        if(docs.length){
            device.exists = true;
        }

        res.device = device;
        next();
    });
};

device.getAllDevices = function(req, res, next){
    Device.find({},'', function(err, docs){
        res.devices = docs;
        next();
    });
};

device.postDevice = function(req, res){
    var uaObj = uaParser.parse(req.headers['user-agent']);

    var device = new DeviceHelper();
    device.setFeatures(req.body);
    device.setUserAgent(uaObj);
    device.setOperatingSystem(uaObj);

    new Device( device ).save(function(err){
        if(err){
            clog.error(err);
            res.json({ error: err.err }, 409);
        }
        res.json({ }, 200);
    });
};



// views
device.view = {};

device.view.index = function(req, res){
    return res.render('device', {
        title: 'Device',
        device: res.device || {},
        devices: res.devices || {}
    });
};


module.exports = device;