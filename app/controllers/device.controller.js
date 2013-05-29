var clog = require('clog'),
    device = {},
    Device = require('../../app/models/device.schema'),
    DeviceHelper = require('../../app/helpers/device.helper'),
    uaParser = require('ua-parser');


device.getDevice = function (req, res, next) {
    var ua = req.headers['user-agent'],
        device = uaParser.parse(ua);

        console.log(device)

    Device.getDevice(ua, function(err, docs){
        if( err ){
            return next( new Error( 'Unable to detect device from database') );
        }

        if(docs.length > 0){
            device = docs[0].toObject();
        } else {
            device.agent = device.ua;
            device.system = device.os;
            device.agent.id = device.ua.toString();
            device.system.id = device.ua.toString();
        }

        device.exists = !!docs.length;

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
    var uaObj = uaParser.parse(req.headers['user-agent']),
        props = req.body;

    var device = new DeviceHelper();
    device.setFeatures(props);
    device.setUserAgent(uaObj);
    device.setOperatingSystem(uaObj);
    device.setDevice(props, uaObj);
    device.validateDevice();

    console.log(uaObj);

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
    return res.render('device/index', {
        title: 'Device',
        device: res.device || {},
        devices: res.devices || {}
    });
};


module.exports = device;