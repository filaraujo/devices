var loggerDB = require('winston').loggers.get('database'),
    DeviceAnalysis = require('../../app/models/device.analysis.schema'),
    DeviceAnalysisHelper = require('../../app/helpers/device.analysis.helper');

// curl -v -H "Content-Type: application/json" -X PUT -d '{"tests":{"fullscreen": false, "postmessage": true, "bgrepeatround": false, "bgrepeatspace": true}}' http://localhost:3000/device/51fb0a8b7c6bcb0000000002/analysis -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.41 Safari/537.36"
//
//
exports.delete = {
    all: function (req, res) {
        DeviceAnalysis.remove({}, function(err){
            if(err){
                loggerDB.error(err);
                res.json({ }, 500);
            }
            res.json({ }, 204);
        });
    }
};

exports.post = function(req, res) {
    var analysis = new DeviceAnalysisHelper(res.device).instrument();

    new DeviceAnalysis(analysis).save(function(err) {
        if (err) {
            loggerDB.error(err);
            res.json({
                error: err.err
            }, 409);
        }
        res.json({}, 200);
    });
};


exports.put = {

    features: function(req, res) {
        var device = new DeviceAnalysisHelper(res.device),
            analysis =  device.increment(req.body.features);
        
        DeviceAnalysis.update(
            { reference: device.reference },
            { $inc: analysis },
            function(err) {
                if (err) {
                    loggerDB.error(err);
                    res.json({ error: err.err }, 409);
                }
                loggerDB.info('Analysis saved to database: ' + device.id);
                res.json({}, 200);
            });
    },

    byFeatures: function(req, res) {
        // var analysis,
        //     ua = req.headers['user-agent'];

        // analysis = new DeviceAnalysisHelper(ua, req.body.tests).increment();
        //


        // DeviceAnalysis.update({
        //     id: analysis.id
        // }, {
        //     $inc: analysis
        // }, function(err) {
        //     if (err) {
        //         loggerDB.error(err);
        //         res.json({
        //             error: err.err
        //         }, 409);
        //     }

        //     res.json({}, 200);
        // });
    }
};