var clog = require('clog'),
    DeviceAnalysis = require('../../app/models/device.analysis.schema'),
    DeviceAnalysisHelper = require('../../app/helpers/device.analysis.helper');

// curl -v -H "Content-Type: application/json" -X PUT -d '{"tests":{"fullscreen": false, "postmessage": true, "bgrepeatround": false, "bgrepeatspace": true}}' http://localhost:3000/device/51fb0a8b7c6bcb0000000002/analysis -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.41 Safari/537.36"


exports.post = function(req, res) {
    var analysis = new DeviceAnalysisHelper(res.device).instrument();

    new DeviceAnalysis(analysis).save(function(err) {
        if (err) {
            clog.error(err);
            res.json({
                error: err.err
            }, 409);
        }
        res.json({}, 200);
    });

};


exports.put = function(req, res) {
    var analysis,
        ua = req.headers['user-agent'];

    analysis = new DeviceAnalysisHelper(ua, req.body.tests).increment();

    DeviceAnalysis.update({
        id: analysis.id
    }, {
        $inc: analysis
    }, function(err) {
        if (err) {
            clog.error(err);
            res.json({
                error: err.err
            }, 409);
        }

        res.json({}, 200);
    });
};